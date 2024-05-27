import { cn } from "../../../utils/cn";

export type THelperTextType = "success" | "error";

const HelperText = ({
  type,
  message,
  className,
}: {
  type: THelperTextType;
  message?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "text-sm",
        type === "success" && "text-green-600",
        type === "error" && "text-red-500",
        className
      )}
    >
      {message}
    </div>
  );
};

export default HelperText;
