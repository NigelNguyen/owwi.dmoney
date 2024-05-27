import { IAvatarProps } from "../Avatar";
import { TShape, TSize } from "../../../types/constants";
import { cn } from "../../../utils/cn";

const iconSizeMap: Record<TSize, string> = {
  large: "w-20 h-20",
  medium: "w-10 h-10",
  small: "w-5 h-5",
};
const iconVariantMap: Record<TShape, string> = {
  rounded: "rounded-full",
  squared: "rounded-md",
};

export interface IIconProps extends IAvatarProps {
  padding?: string;
}

const Icon = ({
  image,
  size = "medium",
  variant = "squared",
  padding = "p-4",
  className,
}: IIconProps) => {
  return (
    <div
      className={cn(
        "border-[1px] border-slate-50 hover:border-slate-800",
        iconVariantMap[variant],
        padding,
        className
      )}
    >
      <img src={image} className={cn(iconSizeMap[size])} />
    </div>
  );
};

export default Icon;
