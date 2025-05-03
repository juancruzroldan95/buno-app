export type GetCase = {
  caseId: string;
  title: string;
  description: string;
  lawAreaId: number;
  lawAreaLabel: string | null;
  provinceId: number;
  provinceLabel: string | null;
  status: "open" | "in_progress" | "closed" | "cancelled";
  createdAt: Date;
};
