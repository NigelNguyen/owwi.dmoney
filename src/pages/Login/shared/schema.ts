import * as zod from "zod";
import {
  notEmptyFieldDynamic,
} from "../../../constants/validateMessage";

export const userSchema = zod.object({
  email: zod.string().min(1, notEmptyFieldDynamic("Email")).email('Email is invalid'),
  password: zod.string().min(1, notEmptyFieldDynamic("Password")),
  metaMaskAddress: zod.string().optional(),
  signature: zod.string().optional()
});

export type TUserForm = zod.infer<typeof userSchema>;
