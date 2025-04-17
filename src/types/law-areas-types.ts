import { SelectLawArea } from "@/db/schemas/law-areas-schema";

export type LawAreaSelector = Pick<SelectLawArea, "lawAreaId" | "lawAreaLabel">;
