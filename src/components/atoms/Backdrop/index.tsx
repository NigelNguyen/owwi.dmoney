import { cn } from "../../../utils/cn";

const Backdrop = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#0000006a]",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Backdrop;
