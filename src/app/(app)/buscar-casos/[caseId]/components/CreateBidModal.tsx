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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NewBidForm from "./NewBidForm";

interface CreateBidModalProps {
  caseId: string;
  caseDescription: string;
  lawyerId: string;
  hasAlreadyBid: boolean;
  isVerified: boolean;
}

export function CreateBidModal({
  caseId,
  caseDescription,
  lawyerId,
  hasAlreadyBid,
  isVerified,
}: CreateBidModalProps) {
  const [open, setOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const isDisabled = hasAlreadyBid || !isVerified;

  const tooltipText = hasAlreadyBid
    ? "Ya enviaste una propuesta para este caso"
    : "Tu perfil debe estar verificado para enviar propuestas";

  const handleTouchStart = () => {
    if (isDisabled) {
      setIsTooltipOpen(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isDisabled ? (
          <TooltipProvider>
            <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
              <TooltipTrigger asChild>
                <div onTouchStart={handleTouchStart}>
                  <Button className="w-full md:w-auto" disabled>
                    <PenTool className="size-4" />
                    Escribir propuesta
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button className="w-full md:w-auto">
            <PenTool className="size-4" />
            Escribir propuesta
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enviá tu propuesta al cliente</DialogTitle>
          <DialogDescription>
            Contale al cliente cómo podés ayudarlo con su caso. Podés incluir tu
            enfoque, experiencia relevante y un presupuesto estimado si querés.
          </DialogDescription>
        </DialogHeader>
        <NewBidForm
          caseId={caseId}
          caseDescription={caseDescription}
          lawyerId={lawyerId}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
