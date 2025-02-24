"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// UI
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
import { Checkbox } from "@/components/ui/checkbox";

// Lib
import { firebaseLogin } from "@/firebase/auth";

const formSchema = z.object({
  email: z.string().email("Por favor ingresá un email válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
  rememberMe: z.boolean().default(false),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isGoogleLoginLoading, setIsGoogleLoginLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function handleLogin(values: z.infer<typeof formSchema>) {
    try {
      setIsLoginLoading(true);
      setErrorMessage("");
      const response = await firebaseLogin(values);
      console.log(response);
      return;
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsLoginLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setIsGoogleLoginLoading(true);
      // const response = await googleLogin();
      // console.log(response);
      return;
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsGoogleLoginLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="mb-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoginLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
              Google
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => console.log("Facebook login")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
              </svg>
              Facebook
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                O continuá con
              </span>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" autoComplete="email" />
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
                  <div className="flex items-center justify-between">
                    <FormLabel>Contraseña</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Recordame</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {errorMessage && (
              <div>
                <p className="text-red-500 text-sm">{errorMessage}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoginLoading}>
              {isLoginLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
