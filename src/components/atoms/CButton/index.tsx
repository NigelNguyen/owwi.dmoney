import { cn } from "../../../utils/cn";

const CButton = ({
  label,
  onClick,
  type,
  disabled,
  className,
}: {
  label: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  disabled?:boolean
  className?: string;
}) => {
  return (
    <button
      className={cn(
        "border-none bg-slate-950 px-4 py-2 rounded-md text-slate-50 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CButton;
