import { SelectProvince } from "@/db/schemas/provinces-schema";

export type ProvinceSelector = Pick<
  SelectProvince,
  "provinceId" | "provinceLabel"
>;
