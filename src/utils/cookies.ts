import Cookies from "js-cookie";

export const cookie = {
  set: (key: string, value: string) => Cookies.set(key, value),
  get: (key: string) => Cookies.get(key),
  remove: (key: string) => Cookies.remove(key),
};
