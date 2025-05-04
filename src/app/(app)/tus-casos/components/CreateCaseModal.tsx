"use client";

import React, { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import { SelectLawArea } from "@/db/schemas/law-areas-schema";
import { SelectProvince } from "@/db/schemas/provinces-schema";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewCaseForm from "./NewCaseForm";

type ProvinceSelector = Pick<SelectProvince, "provinceId" | "provinceLabel">;
type LawAreaSelector = Pick<SelectLawArea, "lawAreaId" | "lawAreaLabel">;

interface CreateCaseModalProps {
  clientId: string;
  provinces: ProvinceSelector[];
  lawAreas: LawAreaSelector[];
}

export function CreateCaseModal({
  clientId,
  provinces,
  lawAreas,
}: CreateCaseModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">
          <PlusCircle className="size-4" />
          Nuevo caso
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Qué necesitás que haga un abogado?</DialogTitle>
          <DialogDescription>
            Escribí con tus palabras lo que te pasó o lo que necesitás resolver.
            No hace falta que suene formal, nuestra inteligencia artificial va a
            ayudarte a redactar tu caso de forma clara y profesional. Cuantos
            más detalles incluyas, mejor vamos a poder armar el caso por vos e
            identificar a los mejores abogados para tu caso.
          </DialogDescription>
        </DialogHeader>
        <NewCaseForm
          clientId={clientId}
          provinces={provinces}
          lawAreas={lawAreas}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
