"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/utils/utils";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DialogFooter } from "@/components/ui/dialog";

export default function ExperienceForm() {
  const experienceFormSchema = z.object({
    company: z
      .string({ required_error: "El nombre de la empresa es obligatorio" })
      .min(2, "Debe tener al menos 2 caracteres"),
    position: z
      .string({ required_error: "La posición es obligatoria" })
      .min(2, "Debe tener al menos 2 caracteres"),
    startDate: z.date({
      required_error: "La fecha de inicio es obligatoria",
    }),
    endDate: z.date().optional(),
    description: z
      .string({ required_error: "La descripción es obligatoria" })
      .min(50, "La descripción debe tener al menos 50 caracteres"),
  });

  const experienceForm = useForm<z.infer<typeof experienceFormSchema>>({
    resolver: zodResolver(experienceFormSchema),
  });

  async function onExperienceSubmit(
    data: z.infer<typeof experienceFormSchema>
  ) {
    console.log(data);
    // Here you would typically make an API call to update the profile
  }

  return (
    <Form {...experienceForm}>
      <form
        onSubmit={experienceForm.handleSubmit(onExperienceSubmit)}
        className="space-y-4"
      >
        <FormField
          control={experienceForm.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empresa</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-xs ms-1 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={experienceForm.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Posición</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-xs ms-1 mt-1" />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={experienceForm.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha Inicio</FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Elegí una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-xs ms-1 mt-1" />
              </FormItem>
            )}
          />
          <FormField
            control={experienceForm.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha Fin</FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Elegí una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-xs ms-1 mt-1 text-gray-500">
                  Dejá el campo libre si aún trabajas acá
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={experienceForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea {...field} className="h-32" />
              </FormControl>
              <FormMessage className="text-xs ms-1 mt-1" />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-2">
          <Button type="submit">Guardar Experiencia</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
