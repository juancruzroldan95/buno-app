"use client";

import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { SelectEducation } from "@/db/schemas/educations-schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EducationForm from "./EducationForm";

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
          <Pencil className="size-4" />
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
