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
