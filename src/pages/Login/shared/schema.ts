import * as zod from "zod";
import {
  notEmptyFieldDynamic,
} from "../../../constants/validateMessage";

export const userSchema = zod.object({
  email: zod.string().min(1, notEmptyFieldDynamic("email")),
  password: zod.string().min(1, notEmptyFieldDynamic("password")),
  metaMaskAddress: zod.string().optional(),
});

export type TUserForm = zod.infer<typeof userSchema>;
