"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import { updateClient } from "@/lib/clients-actions";
import { SelectClient } from "@/db/schemas/clients-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PersonalClientFormProps {
  initialData: SelectClient;
}

export default function PersonalClientForm({
  initialData,
}: PersonalClientFormProps) {
  const { toast } = useToast();

  const profileFormSchema = z.object({
    firstName: z
      .string({ required_error: "Tu nombre es obligatorio" })
      .min(2, "Tu nombre debe tener al menos 2 caracteres"),
    lastName: z
      .string({ required_error: "Tu apellido es obligatorio" })
      .min(2, "Tu apellido debe tener al menos 2 caracteres"),
    email: z
      .string({ required_error: "El email es obligatorio" })
      .email("Email inválido"),
    phone: z
      .string({ required_error: "El número de teléfono es obligatorio" })
      .min(10, "Número de teléfono inválido"),
    gender: z.enum(["male", "female", "non_binary", "other"], {
      required_error: "El género es obligatorio",
    }),
  });

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      email: initialData.email || "",
      phone: initialData.phone || "",
      gender: initialData.gender || undefined,
    },
  });

  async function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
    try {
      await updateClient(initialData.clientId, data);
      toast({
        description: "Los cambios fueron guardados correctamente.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "No se pudieron guardar los cambios",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...profileForm}>
      <form
        onSubmit={profileForm.handleSubmit(onProfileSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={profileForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={profileForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={profileForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={profileForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={profileForm.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un género" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Femenino</SelectItem>
                    <SelectItem value="non_binary">No binario</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={profileForm.formState.isSubmitting}>
            {profileForm.formState.isSubmitting
              ? "Guardando..."
              : "Guardar Cambios"}
            {profileForm.formState.isSubmitting && (
              <Loader2 className="mr-1 animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
