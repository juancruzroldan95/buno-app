"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";

export default function PersonalForm() {
  const profileFormSchema = z.object({
    firstName: z.string().min(2, "Tu nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "Tu apellido debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(10, "Número de teléfono inválido"),
    bio: z.string().min(20, "La biografía debe tener al menos 20 caracteres"),
    linkedinUrl: z
      .string()
      .url("URL de LinkedIn inválida")
      .optional()
      .or(z.literal("")),
    website: z.string().url("Página web inválida").optional().or(z.literal("")),
  });

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "María",
      lastName: "González",
      email: "maria.gonzalez@example.com",
      phone: "+54 11 1234-5678",
      bio: "Experienced attorney specializing in corporate law and intellectual property. Over 8 years of experience working with technology companies and startups.",
      linkedinUrl: "https://linkedin.com/in/mariagonzalez",
      website: "https://mariagonzalez.law",
    },
  });

  async function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
    console.log(data);
    // Here you would typically make an API call to update the profile
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

        <FormField
          control={profileForm.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Acerca de</FormLabel>
              <FormControl>
                <Textarea {...field} className="h-32" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={profileForm.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perfil de LinkedIn</FormLabel>
                <FormControl>
                  <Input {...field} type="url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={profileForm.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Página web</FormLabel>
                <FormControl>
                  <Input {...field} type="url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Guardar Cambios</Button>
      </form>
    </Form>
  );
}
