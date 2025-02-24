"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Components

// UI
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { createCase } from "@/lib/cases-lib";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  description: z
    .string({
      required_error: "La descripción es obligatoria.",
    })
    .min(100, {
      message: "Usá al menos 100 caracteres.",
    }),
  location: z.enum(["CABA", "Provincia"]),
  category: z.enum([
    "Familia",
    "Penal",
    "Corporativo",
    "Propiedad",
    "Migraciones",
    "Trabajo",
    "Desalojo",
    "Patria potestad",
  ]),
});

type NewCaseFormProps = {
  selectedLocation?: "CABA" | "Provincia";
};

export function NewCaseForm({ selectedLocation }: NewCaseFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      location: selectedLocation,
    },
  });

  const categories = [
    "Familia",
    "Penal",
    "Corporativo",
    "Propiedad",
    "Migraciones",
    "Trabajo",
    "Desalojo",
    "Patria potestad",
  ];

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const caseId = await createCase(data);
      toast({
        title: "Case Published:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify({ ...data, id: caseId }, null, 2)}
            </code>
          </pre>
        ),
      });
      router.push(`/cases/${caseId}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Publishing Case",
        description:
          "There was an error publishing your case. Check the console.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
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
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="w-1/4 mr-2">¿De dónde sos?</FormLabel>
                <FormControl className="w-3/4 justify-start gap-4">
                  <ToggleGroup
                    variant="outline"
                    type="single"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ToggleGroupItem value="CABA">CABA</ToggleGroupItem>
                    <ToggleGroupItem value="Provincia">
                      Provincia
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel className="w-1/4 mr-2">Categoría</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-3/4">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccioná una categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publicando...
              </>
            ) : (
              "Publicar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
