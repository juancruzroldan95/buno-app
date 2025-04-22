"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LawAreaSelector, ProvinceSelector } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { generateCaseSummary } from "@/lib/ai/generate-case-summary";
import { createCase } from "@/lib/cases-actions";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface NewCaseFormProps {
  clientId: string;
  provinces: ProvinceSelector[];
  lawAreas: LawAreaSelector[];
  setOpen: (open: boolean) => void;
}

export default function NewCaseForm({
  clientId,
  lawAreas,
  provinces,
  setOpen,
}: NewCaseFormProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTitle, setGeneratedTitle] = useState("");

  const newCaseFormSchema = z.object({
    title: z.string({
      required_error:
        "Hacé clic en 'Generar descripción ✨' antes de continuar",
    }),
    description: z
      .string({ required_error: "La descripción es obligatoria" })
      .min(50, "La descripción debe tener al menos 50 caracteres"),
    provinceId: z.number({ required_error: "La provincia es obligatoria" }),
    lawAreaId: z.number({
      required_error: "El área de derecho es obligatoria",
    }),
  });

  const newCaseForm = useForm<z.infer<typeof newCaseFormSchema>>({
    resolver: zodResolver(newCaseFormSchema),
    defaultValues: {
      description: "",
      provinceId: undefined,
      lawAreaId: undefined,
    },
  });

  async function handleGenerate() {
    const currentText = newCaseForm.getValues("description");

    if (currentText.length < 50) {
      newCaseForm.setError("description", {
        type: "manual",
        message: "La descripción debe tener al menos 50 caracteres",
      });
      return;
    }

    newCaseForm.clearErrors("title");
    newCaseForm.clearErrors("description");

    try {
      setIsGenerating(true);
      const { title, description, lawAreaId } =
        await generateCaseSummary(currentText);
      setGeneratedTitle(title);
      newCaseForm.setValue("title", title);
      newCaseForm.setValue("description", description);
      newCaseForm.setValue("lawAreaId", lawAreaId);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error al usar la IA",
        description: "Hubo un problema al generar la descripción.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  async function onNewCaseSubmit(data: z.infer<typeof newCaseFormSchema>) {
    try {
      await createCase({ ...data, clientId: clientId });
      toast({
        title: "Caso publicado",
        description: "Tu caso ha sido publicado con éxito.",
        variant: "default",
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudo crear el caso. Intente nuevamente.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...newCaseForm}>
      <form
        onSubmit={newCaseForm.handleSubmit(onNewCaseSubmit)}
        className="w-full space-y-6"
      >
        <FormField
          control={newCaseForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contanos qué te pasó</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escribí tu situación legal con tus palabras"
                  className="resize-none h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <div className="mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating
                    ? "Generando descripción..."
                    : "Generar descripción ✨"}
                </Button>
                {isGenerating && (
                  <p className="text-sm text-muted-foreground mt-1">
                    ✨ Generando resumen con IA...
                  </p>
                )}
              </div>
            </FormItem>
          )}
        />

        {generatedTitle && (
          <div className="text-sm text-muted-foreground border rounded-md p-3 bg-muted">
            <strong className="block text-primary mb-1">
              Título sugerido:
            </strong>
            {generatedTitle}
          </div>
        )}
        <FormField
          control={newCaseForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={newCaseForm.control}
          name="provinceId"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="w-1/4 mr-2">¿De dónde sos?</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl className="w-3/4">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccioná una provincia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem
                        key={province.provinceId}
                        value={province.provinceId.toString()}
                      >
                        {province.provinceLabel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={newCaseForm.control}
          name="lawAreaId"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="w-1/4 mr-2">Área legal</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString()}
                >
                  <FormControl className="w-3/4">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccioná una categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lawAreas.map((lawArea) => (
                      <SelectItem
                        key={lawArea.lawAreaId}
                        value={lawArea.lawAreaId.toString()}
                      >
                        {lawArea.lawAreaLabel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        <DialogFooter className="mt-2">
          <Button type="submit" disabled={newCaseForm.formState.isSubmitting}>
            {newCaseForm.formState.isSubmitting
              ? "Publicando..."
              : "Publicar caso"}
            {newCaseForm.formState.isSubmitting && (
              <Loader2 className="mr-1 animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
