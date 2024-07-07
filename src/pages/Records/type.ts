import * as zod from "zod";
import { notEmptyFieldDynamic } from "../../constants/validateMessage";

export const recordFormSchema = zod.object({
  type: zod.string().min(1, notEmptyFieldDynamic("Type")),
  category: zod.string().min(1, notEmptyFieldDynamic("Category")),
  partner: zod.string().min(1, notEmptyFieldDynamic("Partner")),
  amount: zod.string().min(0, "Amount cannot be less than 0"),
  description: zod.string().optional(),
  date: zod.string().min(1, notEmptyFieldDynamic("Create date")),
});

export type TRecordForm = zod.infer<typeof recordFormSchema>;

export const recordFilterSchema = zod.object({
  partner: zod.string().optional(),
  category: zod.string().optional(),
  description: zod.string().optional(),
  type: zod.string().optional(),
  min: zod.string().optional(),
  max: zod.string().optional(),
  from: zod.string().optional(),
  to: zod.string().optional(),
});

export type TRecordFilter = zod.infer<typeof recordFilterSchema>;
