"use client";

import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { SelectExperience } from "@/db/schemas/experiences-schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ExperienceForm from "./ExperienceForm";

export default function UpdateExperienceModal({
  lawyerId,
  experience,
}: {
  lawyerId: string;
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
        <ExperienceForm
          lawyerId={lawyerId}
          experience={experience}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
