"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, WandSparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { improveProposal } from "@/lib/ai/improve-proposal";
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
import { Textarea } from "@/components/ui/textarea";

interface NewBidFormProps {
  caseId: string;
  caseDescription: string;
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
  caseDescription,
  lawyerId,
  setOpen,
}: NewBidFormProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof bidFormSchema>>({
    resolver: zodResolver(bidFormSchema),
    defaultValues: {
      proposal: "",
      bidAmount: 0,
    },
  });

  async function handleGenerate() {
    const currentText = form.getValues("proposal");

    if (currentText.length < 50) {
      form.setError("proposal", {
        type: "manual",
        message: "La propuesta debe tener al menos 20 caracteres",
      });
      return;
    }

    form.clearErrors("proposal");

    try {
      setIsGenerating(true);
      const improvedProposal = await improveProposal(
        currentText,
        caseDescription
      );
      form.setValue("proposal", improvedProposal);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error al usar la IA",
        description: "Hubo un problema al generar la descripción.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }

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
          "Tu propuesta fue enviada con éxito al cliente. Podés ver tus propuestas enviadas en la sección Mis Propuestas.",
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
              <FormLabel className="text-base">Escribí tu propuesta</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none h-64"
                  placeholder="Contale al cliente cómo podés ayudarlo..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <div className="mt-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full font-bold"
                  size="sm"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    "Leyendo tu propuesta..."
                  ) : (
                    <>
                      Mejorar propuesta
                      <WandSparkles className="size-4" />
                    </>
                  )}
                </Button>
              </div>
            </FormItem>
          )}
        />

        <DialogFooter className="mt-2">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || isGenerating}
          >
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
