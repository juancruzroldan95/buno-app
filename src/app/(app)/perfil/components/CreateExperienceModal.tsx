"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import ExperienceForm from "./ExperienceForm";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function CreateExperienceModal({
  lawyerId,
}: {
  lawyerId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Experiencia
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nueva Experiencia</DialogTitle>
        </DialogHeader>
        <DialogDescription>Compartí tu experiencia laboral</DialogDescription>
        <ExperienceForm lawyerId={lawyerId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
