"use client";

import { useTransition } from "react";
import { Phone } from "lucide-react";
import { sendLog } from "@/lib/logs-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ContactButtonProps {
  uid: string | null;
  email?: string | null;
  phone?: string | null;
}

export function ContactButton({ uid, email, phone }: ContactButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      // sendLog({ eventName: "contact-lawyer", uid });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full sm:w-auto"
          size="sm"
          variant="default"
          onClick={handleClick}
          disabled={isPending}
        >
          <Phone className="mr-1 size-4" />
          Contactar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contacto del abogado</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-primary">Email:</span>{" "}
            {email || "No disponible"}
          </div>
          <div>
            <span className="font-medium text-primary">Teléfono:</span>{" "}
            {phone || "No disponible"}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
