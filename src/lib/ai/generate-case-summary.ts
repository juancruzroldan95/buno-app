"use server";

import { ai } from "@/utils/genkit";

export async function generateCaseSummary(userText: string) {
  const prompt = `
	El siguiente texto fue escrito por un cliente describiendo su caso legal con sus propias palabras.

	Generá:

	1. Un título profesional y claro para el caso (máximo 12 palabras).
	2. Una descripción detallada y profesional del caso (máximo 300 palabras).
	3. El área legal más adecuada para el caso (elegí solo una de la siguiente lista si o si):

	Áreas legales:
	1. Despidos y Accidentes Laborales
	2. Contratos
	3. Divorcios
	4. Marcas y Patentes
	5. Siniestros
	6. Penal
	7. Familia
	8. Migratorio
	9. Corporativo
	10. Tributario y Finanzas

	Importante: 
	- No incluyas encabezados como "Título:", "Descripción:" ni "Área legal:".
	- Separá el título, la descripción y el área legal (devolvé solo el número sin el punto del área legal) con una línea en blanco.

	Texto del cliente:
	"""
	${userText}
	"""
	`;

  const { text } = await ai.generate(prompt);

  const [title, description, lawAreaId] = text
    .split("\n\n")
    .map((s) => s.trim());

  return {
    title,
    description,
    lawAreaId: Number(lawAreaId),
  };
}
