import { TShape, TSize } from "../../../types/constants";
import { cn } from "../../../utils/cn";

const avatarSizeMap: Record<TSize, string> = {
  large: "w-20 h-20",
  medium: "w-10 h-10",
  small: "w-5 h-5",
};
const avatarVariantMap: Record<TShape, string> = {
  rounded: "rounded-full",
  squared: "rounded-md",
};

export interface IAvatarProps {
  image?: string;
  size?: TSize;
  variant?: TShape;
  className?: string;
}

const Avatar = ({
  image,
  size = "medium",
  variant = "squared",
  className,
}: IAvatarProps) => {
  return (
    <img
      src={image}
      className={cn(avatarSizeMap[size], avatarVariantMap[variant], className)}
    />
  );
};

export default Avatar;
