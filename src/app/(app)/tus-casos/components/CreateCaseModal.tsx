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
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo caso
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Qué necesitás que haga un abogado?</DialogTitle>
          <DialogDescription>
            Describí tus necesidades legales. Incluí tantos detalles como sea
            posible, ya que esto nos ayudará a identificar a los mejores
            abogados para tu caso.
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
