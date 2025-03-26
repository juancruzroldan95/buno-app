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

export default function ExperienceModal({ lawyerId }: { lawyerId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Agregar Experiencia
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Agregar Nueva Experiencia</DialogTitle>
        </DialogHeader>
        <ExperienceForm lawyerId={lawyerId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
