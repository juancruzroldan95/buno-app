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
import { Plus } from "lucide-react";
import EducationForm from "./EducationForm";

export default function CreateEducationModal({
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
          Agregar Educación
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nueva Educación</DialogTitle>
        </DialogHeader>
        <DialogDescription>Compartí tu trayectoria académica</DialogDescription>
        <EducationForm lawyerId={lawyerId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
