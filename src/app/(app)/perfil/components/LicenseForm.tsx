"use client";

import React from "react";
import { BAR_ASSOCIATIONS } from "@/consts/consts";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createLicense, updateLicense } from "@/lib/licenses-actions";
import { SelectLicense } from "@/db/schemas/licenses-schema";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LicenseFormProps {
  lawyerId?: string;
  license?: SelectLicense;
  setOpen: (open: boolean) => void;
}

export default function LicenseForm({
  lawyerId,
  license,
  setOpen,
}: LicenseFormProps) {
  const { toast } = useToast();

  const licenseFormSchema = z.object({
    barAssociation: z
      .string({ required_error: "El colegio de abogados es requerido" })
      .min(2, "Debe tener al menos 2 caracteres")
      .max(50, "No puede tener más de 50 caracteres"),
    volume: z
      .number({ required_error: "El tomo es requerido" })
      .min(1, "Debe ser mayor a 0"),
    folio: z
      .number({ required_error: "El folio es requerido" })
      .min(1, "Debe ser mayor a 0"),
  });

  const licenseForm = useForm<z.infer<typeof licenseFormSchema>>({
    resolver: zodResolver(licenseFormSchema),
    defaultValues: {
      barAssociation: license?.barAssociation || "",
      volume: license?.volume || 0,
      folio: license?.folio || 0,
    },
  });

  async function onLicenseSubmit(data: z.infer<typeof licenseFormSchema>) {
    try {
      if (license?.licenseId) {
        await updateLicense(license.licenseId, data);
      } else {
        await createLicense({ ...data, lawyerId: lawyerId! });
      }
      toast({
        description: "Los cambios fueron guardados correctamente.",
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...licenseForm}>
      <form
        onSubmit={licenseForm.handleSubmit(onLicenseSubmit)}
        className="space-y-4"
      >
        <FormField
          control={licenseForm.control}
          name="barAssociation"
          render={({ field }) => (
            <FormItem className="flex items-center gap-x-4">
              <FormLabel className="text-right">Colegio de Abogados</FormLabel>
              <div className="w-full">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccioná un colegio de abogados" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BAR_ASSOCIATIONS.map((barAssociation) => (
                      <SelectItem key={barAssociation} value={barAssociation}>
                        {barAssociation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-4">
          <FormField
            control={licenseForm.control}
            name="volume"
            render={({ field }) => (
              <FormItem className="flex items-center gap-x-4">
                <FormLabel className="text-right">Tomo</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      className="col-span-3"
                      type="number"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={licenseForm.control}
            name="folio"
            render={({ field }) => (
              <FormItem className="flex items-center gap-x-4">
                <FormLabel className="text-right">Folio</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      className="col-span-3"
                      type="number"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="mt-2">
          <Button type="submit" disabled={licenseForm.formState.isSubmitting}>
            {licenseForm.formState.isSubmitting
              ? "Guardando..."
              : "Guardar Matrícula"}
            {licenseForm.formState.isSubmitting && (
              <Loader2 className="mr-1 animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
