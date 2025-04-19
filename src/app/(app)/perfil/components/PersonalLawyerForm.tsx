"use client";

import React from "react";
import { useToast } from "@/hooks/use-toast";
import { GetLawyer, LawAreaSelector, ProvinceSelector } from "@/types";
import { cn } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateLawyer } from "@/lib/lawyers-actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface PersonalLawyerFormProps {
  initialData: GetLawyer;
  provinces: ProvinceSelector[];
  lawAreas: LawAreaSelector[];
}

export default function PersonalLawyerForm({
  initialData,
  provinces,
  lawAreas,
}: PersonalLawyerFormProps) {
  const { toast } = useToast();

  const lawyerProfileFormSchema = z.object({
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
      .min(10, "Número de teléfono inválido")
      .optional()
      .or(z.literal("")),
    gender: z.enum(["male", "female", "non_binary", "other"], {
      required_error: "El género es obligatorio",
    }),
    birthDate: z.date({
      required_error: "La fecha de nacimiento es obligatoria",
    }),
    provinceId: z.number({ required_error: "La provincia es obligatoria" }),
    jurisdiction: z.string().optional().or(z.literal("")),
    lawyerSchool: z
      .string({ required_error: "El colegio de abogados es obligatorio" })
      .min(3, "El colegio de abogados debe tener al menos 3 caracteres"),
    licenseNumber: z
      .string({ required_error: "El número de matrícula es obligatorio" })
      .min(4, "El número de matrícula debe tener al menos 4 caracteres"),
    lawAreaIds: z
      .array(z.number())
      .refine((value) => value.some((item) => item), {
        message: "Debes seleccionar al menos un área de derecho",
      }),
    bio: z.string().min(20, "La biografía debe tener al menos 20 caracteres"),
    linkedinUrl: z
      .string()
      .url("URL de LinkedIn inválida")
      .optional()
      .or(z.literal("")),
    website: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => {
          if (!val) return true;
          try {
            new URL(val.startsWith("http") ? val : `https://${val}`);
            return true;
          } catch {
            return false;
          }
        },
        {
          message: "Página web inválida",
        }
      ),
  });

  const lawyerProfileForm = useForm<z.infer<typeof lawyerProfileFormSchema>>({
    resolver: zodResolver(lawyerProfileFormSchema),
    defaultValues: {
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      email: initialData.email || "",
      phone: initialData.phone || "",
      gender: initialData.gender || undefined,
      birthDate: initialData.birthDate || undefined,
      provinceId: initialData.provinceId || undefined,
      jurisdiction: initialData.jurisdiction || "",
      lawyerSchool: initialData.lawyerSchool || "",
      licenseNumber: initialData.licenseNumber || "",
      lawAreaIds: initialData.lawAreaIds || [],
      bio: initialData.bio || "",
      linkedinUrl: initialData.linkedinUrl || "",
      website: initialData.website || "",
    },
  });

  async function onProfileSubmit(
    data: z.infer<typeof lawyerProfileFormSchema>
  ) {
    try {
      await updateLawyer(initialData.lawyerId, data);
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
    <Form {...lawyerProfileForm}>
      <form
        onSubmit={lawyerProfileForm.handleSubmit(onProfileSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={lawyerProfileForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Nombre*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={lawyerProfileForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Apellido*</FormLabel>
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
            control={lawyerProfileForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Email*</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={lawyerProfileForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Celular</FormLabel>
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
            control={lawyerProfileForm.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Género*</FormLabel>
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
          <FormField
            control={lawyerProfileForm.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Fecha de nacimiento*
                </FormLabel>
                <div className="col-span-3">
                  <Popover>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={lawyerProfileForm.control}
            name="provinceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Provincia*</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={lawyerProfileForm.control}
            name="jurisdiction"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Jurisdicción</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={lawyerProfileForm.control}
            name="lawyerSchool"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Colegio de Abogados*
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={lawyerProfileForm.control}
            name="licenseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Número de Matrícula*
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={lawyerProfileForm.control}
          name="lawAreaIds"
          render={() => (
            <FormItem>
              <div className="mb-1">
                <FormLabel className="text-base">Areas del Derecho*</FormLabel>
                <FormDescription>
                  Seleccioná las áreas del derecho en las que te especializás.
                </FormDescription>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {lawAreas.map((lawArea) => (
                  <FormField
                    key={lawArea.lawAreaId}
                    control={lawyerProfileForm.control}
                    name="lawAreaIds"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={lawArea.lawAreaId}
                          className="flex flex-row items-center space-x-3"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(lawArea.lawAreaId)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      lawArea.lawAreaId,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== lawArea.lawAreaId
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-base">
                            {lawArea.lawAreaLabel}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={lawyerProfileForm.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Acerca de*</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="h-32"
                  placeholder="Describí tu experiencia y especialización..."
                />
              </FormControl>
              <FormMessage className="ms-1 mt-1 text-gray-500">
                Mínimo 20 caracteres
              </FormMessage>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={lawyerProfileForm.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Perfil de LinkedIn</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={lawyerProfileForm.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Página web</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="text-sm italic text-muted-foreground">
          Los campos con * son obligatorios
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={lawyerProfileForm.formState.isSubmitting}
          >
            {lawyerProfileForm.formState.isSubmitting
              ? "Guardando..."
              : "Guardar Cambios"}
            {lawyerProfileForm.formState.isSubmitting && (
              <Loader2 className="mr-1 animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
