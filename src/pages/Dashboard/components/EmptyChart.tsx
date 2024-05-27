import { useNavigate } from "react-router-dom";
import CButton from "../../../components/atoms/CButton";
import { cn } from "../../../utils/cn";
import { paths } from "../../../routes/routes";

const EmptyChart = ({ className }: { className?: string }) => {
    const navigate = useNavigate();

  return (
    <div
      className={cn(
        "flex flex-col gap-2 text-center justify-between items-center min-h-64",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <p className="font-medium">Uh oh!</p>
        <p>There is no data for statistic.</p>
        <p className="font-semibold">Let create records!</p>
      </div>
      <CButton label="Create record" className="w-fit" onClick={()=>navigate(paths.records)}/>
    </div>
  );
};

export default EmptyChart;
