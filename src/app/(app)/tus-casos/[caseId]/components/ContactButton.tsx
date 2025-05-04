"use client";

import { useTransition } from "react";
import { Phone } from "lucide-react";
import { sendLog } from "@/lib/logs-actions";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

type Props = {
  uid: string;
};

export function ContactButton({ uid }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      sendLog({
        eventName: "contact-lawyer",
        uid,
      });
    });
  };

  return (
    <DialogTrigger asChild>
      <Button
        size="sm"
        variant="default"
        onClick={handleClick}
        disabled={isPending}
      >
        <Phone className="mr-1 size-4" />
        Contactar
      </Button>
    </DialogTrigger>
  );
}
