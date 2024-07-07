import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { cn } from "../../../utils/cn";

export const TablePagination = ({
  page,
  totalPage,
  onNextClick,
  onPreviousClick,
}: {
  page: number;
  totalPage: number;
  onPreviousClick?: () => void;
  onNextClick?: () => void;
}) => {
  return (
    <div className="flex items-center gap-1 w-fit">
      <button
        onClick={onPreviousClick}
        disabled={page === 1}
        className={cn(
          "px-1",
          page === 1 && "hover:cursor-not-allowed opacity-20"
        )}
      >
        <FaChevronLeft size={12} />
      </button>
      <span>{`Page ${page} of ${totalPage}`}</span>
      <button
        onClick={onNextClick}
        disabled={page === totalPage}
        className={cn(
          "px-1",
          page === totalPage && "hover:cursor-not-allowed opacity-20"
        )}
      >
        <FaChevronRight size={12} />
      </button>
    </div>
  );
};
