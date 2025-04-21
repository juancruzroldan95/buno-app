"use server";

import { ai } from "@/utils/genkit";

export async function generateCaseSummary(userText: string) {
  const prompt = `
	El siguiente texto fue escrito por un cliente describiendo su caso legal con sus propias palabras.

	Generá:

	1. Un título profesional y claro para el caso (máximo 12 palabras).
	2. Una descripción detallada y profesional del caso (máximo 400 palabras).

	Importante: 
	- No incluyas encabezados como "Título:" o "Descripción:".
	- Separá el título y la descripción con una línea en blanco.

	Texto del cliente:
	"""
	${userText}
	"""
	`;

  const { text } = await ai.generate(prompt);

  console.log("response", text);

  const [title, ...descriptionLines] = text.split("\n").filter(Boolean);
  const description = descriptionLines.join(" ").trim();

  return {
    title: title.trim(),
    description,
  };
}
