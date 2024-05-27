import * as zod from "zod";
import { notEmptyFieldDynamic } from "../../constants/validateMessage";

export const partnerSchema = zod.object({
  name: zod.string().min(1, notEmptyFieldDynamic("Partner name")),
  description: zod.string().optional(),
});

export type TPartnerForm = zod.infer<typeof partnerSchema>
