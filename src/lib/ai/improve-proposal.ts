"use server";

import { ai } from "@/utils/genkit";

export async function improveProposal(
  userText: string,
  caseDescription: string
) {
  const prompt = `
    Sos un asistente legal experto en redacción persuasiva. El siguiente texto fue escrito por un abogado como propuesta para un potencial cliente. Tu tarea es mejorarla manteniendo su intención original pero haciendo que suene más profesional, convincente y clara.

    El objetivo es que el cliente se sienta seguro, valorado y motivado a contactar al abogado. Corregí errores de ortografía, puntuación o estilo. Usá un tono respetuoso, cálido y confiable. La propuesta debe ser breve, concisa y directa.

    NO agregues información que el abogado no haya escrito. Solo mejorá lo que está.

    Propuesta original:
    """
    ${userText}
    """

    Esta es la descripción del caso a la que se está enviando la propuesta:
    """
    ${caseDescription}
    """

    Devolvé solamente la propuesta mejorada basado en la descripción del caso y la propuesta original.
  `;

  const { text } = await ai.generate(prompt);
  return text;
}
