import { InputHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";
import HelperText from "../HelperText";

export interface TCInputProps
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "onFocus" | "onBlur" | "min" | "max" | "step" | "minLength"
  > {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  errorMessage?: string;
}

const CInput = ({
  onChange,
  value,
  type,
  className,
  errorMessage,
  ...props
}: TCInputProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <input
        className={cn(
          "outline-gray-900 border-gray-500 text-black hover:border-gray-700 border-[1px] px-3 py-1 rounded-md w-full",
          className
        )}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        {...props}
      />
      {errorMessage && <HelperText type="error" message={errorMessage} />}
    </div>
  );
};

export default CInput;
