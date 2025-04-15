"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCase } from "@/lib/cases-actions";
import { SelectLawArea } from "@/db/schemas/law-areas-schema";
import { SelectProvince } from "@/db/schemas/provinces-schema";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
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

type ProvinceSelector = Pick<SelectProvince, "provinceId" | "provinceLabel">;
type LawAreaSelector = Pick<SelectLawArea, "lawAreaId" | "lawAreaLabel">;

interface NewCaseFormProps {
  clientId: string;
  provinces: ProvinceSelector[];
  lawAreas: LawAreaSelector[];
  setOpen: (open: boolean) => void;
}

export default function newCaseForm({
  clientId,
  lawAreas,
  provinces,
  setOpen,
}: NewCaseFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const newCaseFormSchema = z.object({
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

  async function onNewCaseSubmit(data: z.infer<typeof newCaseFormSchema>) {
    try {
      const response = await createCase({ ...data, clientId: clientId });
      console.log({ response });
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
              <FormLabel></FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  className="resize-none h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription>
          Una buena descripción incluye:
          <ul className="list-disc pl-4">
            <li>Detalles únicos sobre su proyecto o necesidades legales.</li>
            <li>Cronograma del proyecto y entregables esperados.</li>
            <li>Sus expectativas presupuestarias.</li>
            <li>Experiencia legal específica que necesita.</li>
          </ul>
        </FormDescription>
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
                  defaultValue={field.value?.toString()}
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
