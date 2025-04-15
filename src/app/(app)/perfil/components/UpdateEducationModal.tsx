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
import EducationForm from "./EducationForm";
import { SelectEducation } from "@/db/schemas/educations-schema";

export default function UpdateEducationModal({
  education,
}: {
  education: SelectEducation;
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
          <DialogTitle>Actualizar Educación</DialogTitle>
        </DialogHeader>
        <DialogDescription>Actualizá tu educación</DialogDescription>
        <EducationForm education={education} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
