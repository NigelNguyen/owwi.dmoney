import { IoMdClose } from "react-icons/io";
import { cn } from "../../utils/cn";

const Overlay = ({
  children,
  className,
  onClickCloseButton,
  isShowCloseButton = true,
}: {
  children?: React.ReactNode;
  className?: string;
  isShowCloseButton?: boolean;
  onClickCloseButton?: () => void;
}) => {
  return (
    <div
      className={cn(
        "relative p-6 bg-white text-slate-900 z-10 rounded-md",
        className
      )}
      onClick={(event) => event.stopPropagation()}
    >
      {isShowCloseButton && (
        <span
          className="absolute top-0 right-0 p-1 hover:cursor-pointer"
          onClick={onClickCloseButton}
        >
          <IoMdClose size={24} />
        </span>
      )}
      {children}
    </div>
  );
};

export default Overlay;
