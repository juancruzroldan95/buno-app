"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import ExperienceForm from "./ExperienceForm";
import { SelectExperience } from "@/db/schemas/experiences-schema";

export default function UpdateExperienceModal({
  experience,
}: {
  experience: SelectExperience;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualizar Experiencia</DialogTitle>
        </DialogHeader>
        <DialogDescription>Actualizá tu experiencia laboral</DialogDescription>
        <ExperienceForm experience={experience} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
