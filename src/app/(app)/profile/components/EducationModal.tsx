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
import EducationForm from "./EducationForm";

export default function EducationModal({ lawyerId }: { lawyerId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto md:ms-12">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Educación
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Agregar Nueva Educación</DialogTitle>
        </DialogHeader>
        <EducationForm lawyerId={lawyerId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
