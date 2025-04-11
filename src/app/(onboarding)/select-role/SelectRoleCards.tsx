"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Scale, User } from "lucide-react";
import { createClient } from "@/lib/clients-actions";
import { createLawyer } from "@/lib/lawyers-actions";
import { updateUser } from "@/lib/users-actions";
import { SelectUser } from "@/db/schemas/users-schema";
import { Card, CardContent } from "@/components/ui/card";

export function SelectRoleCards({ user }: { user: SelectUser }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSelect(roleId: number) {
    setLoading(true);

    try {
      await updateUser(user.uid, { roleId });

      if (roleId === 1) {
        await createLawyer({
          uid: user.uid,
          firstName: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
        });
      } else if (roleId === 2) {
        await createClient({
          uid: user.uid,
          firstName: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
        });
      }

      router.push("/home");
    } catch (error) {
      console.error("Error setting role:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un error seteango tu rol.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card
          className="hover:ring-2 ring-primary transition cursor-pointer min-h-[260px]"
          onClick={() => handleSelect(2)}
        >
          <CardContent className="p-8 flex flex-col items-center text-center gap-4">
            <User className="h-12 w-12 text-primary" />
            <h2 className="text-2xl font-semibold">Soy Cliente</h2>
            <p className="text-xl text-muted-foreground max-w-xs">
              Publicá tus casos legales y conectá con abogades de confianza.
            </p>
          </CardContent>
        </Card>

        <Card
          className="hover:ring-2 ring-primary transition cursor-pointer min-h-[260px]"
          onClick={() => handleSelect(1)}
        >
          <CardContent className="p-8 flex flex-col items-center text-center gap-4">
            <Scale className="h-12 w-12 text-primary" />
            <h3 className="text-2xl font-semibold">Soy Abogado</h3>
            <p className="text-xl text-muted-foreground max-w-xs">
              Explorá casos de clientes y enviá propuestas profesionales.
            </p>
          </CardContent>
        </Card>
      </div>

      {loading && (
        <p className="mt-6 text-sm text-muted-foreground">Guardando rol...</p>
      )}
    </>
  );
}
