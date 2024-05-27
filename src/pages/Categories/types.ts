import * as zod from "zod";
import { notEmptyFieldDynamic } from "../../constants/validateMessage";

export const categorySchema = zod.object({
  name: zod.string().min(1, notEmptyFieldDynamic("Partner name")),
  description: zod.string().optional(),
});

export type TCategoryForm = zod.infer<typeof categorySchema>;
