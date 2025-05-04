"use client";

import React, { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewBidForm from "./NewBidForm";

interface CreateBidModalProps {
  caseId: string;
  lawyerId: string;
}

export function CreateBidModal({ caseId, lawyerId }: CreateBidModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">
          <PenTool className="size-4" />
          Escribir propuesta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enviá tu propuesta al cliente</DialogTitle>
          <DialogDescription>
            Contale al cliente cómo podés ayudarlo con su caso. Podés incluir tu
            enfoque, experiencia relevante y un presupuesto estimado si querés.
          </DialogDescription>
        </DialogHeader>
        <NewBidForm caseId={caseId} lawyerId={lawyerId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
