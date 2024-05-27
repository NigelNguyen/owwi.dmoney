// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IPlainObject = Record<string, any>;

export type IOptions = Array<{
  label: string;
  value: string;
}>;


export type TErrorResponse = { message: string }
