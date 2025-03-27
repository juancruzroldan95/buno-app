"use client";

import React, { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteExperience } from "@/lib/experiences-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

export default function DeleteExperienceModal({
  experienceId,
}: {
  experienceId: string;
}) {
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    try {
      await deleteExperience(experienceId);
      setOpen(false);
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la experiencia",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Experiencia</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de eliminar esta experiencia?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit" variant="destructive" onClick={handleDelete}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
