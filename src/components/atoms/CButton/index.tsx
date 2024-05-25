import React, { InputHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

export type TButtonVariant = "outlined" | "contained";

export const buttonVariantMap: Record<TButtonVariant, string> = {
  contained: "border-none bg-slate-950 text-slate-50 hover:bg-slate-600",
  outlined:
    "border-[1px] border-slate-800 bg-white text-slate-950 hover:bg-slate-950 hover:text-slate-50",
};

export interface ICButtonProps
  extends Pick<InputHTMLAttributes<HTMLButtonElement>, "disabled" | "title"> {
  label: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  className?: string;
  variant?: TButtonVariant;
}

const CButton = ({
  label,
  onClick,
  type,
  className,
  variant = "contained",
  ...props
}: ICButtonProps) => {
  return (
    <button
      className={cn(
        "px-4 py-1 rounded-md disabled:cursor-not-allowed disabled:opacity-60",
        buttonVariantMap[variant],
        className
      )}
      onClick={onClick}
      type={type}
      {...props}
    >
      {label}
    </button>
  );
};

export default CButton;
