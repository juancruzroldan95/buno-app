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

export default function EducationForm() {
  const educationFormSchema = z.object({
    institution: z
      .string({ required_error: "Nombre de la institución es requerido" })
      .min(2, "Debe tener al menos 2 caracteres"),
    field: z
      .string({ required_error: "El título es requerido" })
      .min(2, "Debe tener al menos 2 caracteres"),
    graduationDate: z.date({
      required_error: "La fecha de graduación es requerida",
    }),
  });

  const educationForm = useForm<z.infer<typeof educationFormSchema>>({
    resolver: zodResolver(educationFormSchema),
  });

  async function onEducationSubmit(data: z.infer<typeof educationFormSchema>) {
    console.log(data);
    // Here you would typically make an API call to update the profile
  }

  return (
    <Form {...educationForm}>
      <form
        onSubmit={educationForm.handleSubmit(onEducationSubmit)}
        className="space-y-4"
      >
        <FormField
          control={educationForm.control}
          name="institution"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-x-4">
              <FormLabel className="text-right">Institución</FormLabel>
              <FormControl>
                <Input {...field} className="col-span-3" />
              </FormControl>
              <FormMessage className="col-span-3 col-start-2 text-xs ms-1 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={educationForm.control}
          name="field"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-x-4">
              <FormLabel className="text-right">Título</FormLabel>
              <FormControl>
                <Input {...field} className="col-span-3" />
              </FormControl>
              <FormMessage className="col-span-3 col-start-2 text-xs ms-1 mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={educationForm.control}
          name="graduationDate"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-x-4">
              <FormLabel className="text-right">Fecha de graduación</FormLabel>
              <div className="col-span-3">
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
              </div>
              <FormMessage className="col-span-3 col-start-2 text-xs ms-1 mt-1" />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-2">
          <Button type="submit">Guardar Educación</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
