export type GetCase = {
  caseId: string;
  title: string | null;
  description: string;
  lawAreaId: number;
  lawAreaLabel: string | null;
  provinceId: number;
  provinceLabel: string | null;
  status: "open" | "in_progress" | "closed" | "cancelled";
  createdAt: Date;
};
