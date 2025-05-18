"use client";

import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { deleteLicense } from "@/lib/licenses-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DeleteLicenseModal({
  licenseId,
}: {
  licenseId: string;
}) {
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    try {
      await deleteLicense(licenseId);
      setOpen(false);
    } catch (error) {
      console.error("Error deleting license:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la matrícula",
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
          <DialogTitle>Eliminar Matrícula</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de eliminar esta matrícula?
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
