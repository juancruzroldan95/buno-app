"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createBid } from "@/lib/bids-actions";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface NewBidFormProps {
  caseId: string;
  lawyerId: string;
  setOpen: (open: boolean) => void;
}

const bidFormSchema = z.object({
  proposal: z
    .string()
    .min(30, "La propuesta debe tener al menos 20 caracteres."),
  bidAmount: z.number().optional(),
});

export default function NewBidForm({
  caseId,
  lawyerId,
  setOpen,
}: NewBidFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof bidFormSchema>>({
    resolver: zodResolver(bidFormSchema),
    defaultValues: {
      proposal: "",
      bidAmount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof bidFormSchema>) {
    try {
      await createBid({
        caseId,
        proposal: values.proposal,
        bidAmount: values.bidAmount?.toString() || null,
        lawyerId,
      });

      toast({
        title: "Propuesta enviada",
        description:
          "Tu propuesta fue enviada con éxito al cliente. Podés ver tus propuestas enviadas en la sección Mis Casos.",
        duration: 15000,
      });

      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al enviar la propuesta",
        description: "Ocurrió un error. Intentá nuevamente.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="proposal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Escribí tu propuesta*</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none h-32"
                  placeholder="Contale al cliente cómo podés ayudarlo..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bidAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Presupuesto estimado</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Ej: 10000"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                Enviando...
                <Loader2 className="animate-spin" />
              </>
            ) : (
              "Enviar propuesta"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
