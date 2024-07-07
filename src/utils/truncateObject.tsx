import { IPlainObject } from "../types/common";

export const removeUndefinedKeys = (obj: IPlainObject) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );
};
