import { SelectLawyer } from "@/db/schemas/lawyers-schema";

export type GetLawyer = SelectLawyer & {
  lawAreaIds: number[];
};

export type UpdateLawyerInput = Partial<Omit<SelectLawyer, "lawyerId">> & {
  lawAreaIds?: number[];
};
