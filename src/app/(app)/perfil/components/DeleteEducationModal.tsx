"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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
import { deleteEducation } from "@/lib/educations-actions";

export default function DeleteEducationModal({
  educationId,
}: {
  educationId: string;
}) {
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    try {
      await deleteEducation(educationId);
      setOpen(false);
    } catch (error) {
      console.error("Error deleting education:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la educación",
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
          <DialogTitle>Eliminar Educación</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de eliminar esta educación?
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
