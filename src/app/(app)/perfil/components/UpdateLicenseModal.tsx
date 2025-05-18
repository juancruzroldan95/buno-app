"use client";

import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { SelectLicense } from "@/db/schemas/licenses-schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LicenseForm from "./LicenseForm";

export default function UpdateLicenseModal({
  license,
}: {
  license: SelectLicense;
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
        <DialogDescription>Actualizá tu matrícula</DialogDescription>
        <LicenseForm license={license} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
