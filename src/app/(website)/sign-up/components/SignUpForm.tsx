"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteCookie, setCookie } from "cookies-next";
import { FirebaseError } from "firebase/app";
import { Loader2, Scale, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "@/firebase/auth";
import { createClient } from "@/lib/clients-actions";
import { createLawyer } from "@/lib/lawyers-actions";
import { createUser } from "@/lib/users-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const signUpFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  lastName: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Por favor ingresá un email válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  accountType: z.enum(["lawyer", "client"], {
    message: "Por favor seleccioná un tipo de cuenta",
  }),
});

export default function SignUpForm() {
  const router = useRouter();
  const [isGoogleLoginLoading, setIsGoogleLoginLoading] = useState(false);
  const [googleErrorMessage, setGoogleErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      accountType: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    try {
      const user = await registerWithEmailAndPassword(
        values.email,
        values.password
      );
      const idToken = await user.getIdToken();

      if (user) {
        const dbUser = {
          uid: user.uid,
          email: values.email,
          displayName: values.firstName + values.lastName,
          roleId: values.accountType === "lawyer" ? 1 : 2,
        };
        await createUser(dbUser);

        if (values.accountType === "lawyer") {
          await createLawyer({
            uid: user.uid,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
          });
        } else if (values.accountType === "client") {
          await createClient({
            uid: user.uid,
            firstName: values.firstName,
            lastName: values.lastName,
            email: user.email,
          });
        }

        await setCookie("__session", idToken);
        router.push("/como-funciona");
      } else {
        await deleteCookie("__session");
      }
    } catch (error) {
      console.error("Error in manual sign up -", error);
      await deleteCookie("__session");

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMessage(
              "Ese email ya está registrado. Probá iniciar sesión."
            );
            break;
          default:
            setErrorMessage(
              "Ocurrió un error al crear la cuenta. Intentá de nuevo."
            );
        }
      } else {
        setErrorMessage(
          "Ocurrió un error al crear la cuenta. Intentá de nuevo."
        );
      }
    }
  }

  async function handleGoogleSignUp(event: { preventDefault: () => void }) {
    event.preventDefault();
    try {
      setIsGoogleLoginLoading(true);
      const { user, isNewUser } = await signInWithGoogle();
      const idToken = await user.getIdToken();

      if (isNewUser) {
        const dbUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        await createUser(dbUser);
        await setCookie("__session", idToken);
        router.push("/elegir-rol");
      } else {
        await setCookie("__session", idToken);
        router.push("/inicio");
      }
    } catch (error) {
      console.error("Error in Google Sign Up", error);
      await deleteCookie("__session");
      setGoogleErrorMessage(
        "Error al registrarse con Google. Intentá de nuevo."
      );
    } finally {
      setIsGoogleLoginLoading(false);
    }
  }

  return (
    <Card className="mx-2 md:mx-0">
      <CardContent>
        <div className="mb-6">
          <div className="mb-6">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignUp}
                disabled={isGoogleLoginLoading}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {isGoogleLoginLoading
                  ? "Registrando con Google..."
                  : "Registrate con Google"}
              </Button>

              {/* <Button
              variant="outline"
              className="w-full"
              onClick={() => console.log("Facebook login")}
            >
              <svg
                className="h-5 w-5 mr-2 text-[#1877F2] fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button> */}
            </div>
            {googleErrorMessage && (
              <p className="text-red-500 text-sm text-center mt-2">
                {googleErrorMessage}
              </p>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                O registrate con
              </span>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Apellido</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soy un...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lawyer" id="lawyer" />
                        <label
                          htmlFor="lawyer"
                          className="flex items-center cursor-pointer"
                        >
                          <Scale className="h-4 w-4 mr-2" />
                          Abogado
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="client" id="client" />
                        <label
                          htmlFor="client"
                          className="flex items-center cursor-pointer"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Cliente
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  Creando cuenta...
                  <Loader2 className="animate-spin" />
                </>
              ) : (
                "Crear cuenta"
              )}
            </Button>

            {errorMessage && (
              <p className="text-red-500 text-center mt-2">{errorMessage}</p>
            )}

            <p className="text-xs text-center">
              Al hacer clic en "Crear cuenta", acepto y comprendo los{" "}
              <span className="text-indigo-600">Términos de uso</span> y la{" "}
              <span className="text-indigo-600">Política de privacidad</span> de
              Buno.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
