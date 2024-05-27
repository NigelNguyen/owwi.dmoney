import EmptyChart from "./EmptyChart";
import { PieChart } from "../../../components/atoms/PieChart";
import Spin from "../../../components/atoms/Spin";

const PieChartComparison = ({
  dataset,
  title,
  isEmpty,
  isLoading,
  labels,
}: {
  dataset: Array<number>;
  title: string;
  labels: Array<string>;
  isEmpty: boolean;
  isLoading?: boolean;
}) => {
  return (
    <div className="flex h-full flex-col justify-between p-4 bg-white rounded-md items-center">
      {isLoading && (
        <div className="w-full flex justify-center">
          <Spin />
        </div>
      )}
      {!isLoading && isEmpty ? (
        <div className="flex-1 items-center h-full">
          <EmptyChart />
        </div>
      ) : (
        <div className="w-64">
          <PieChart label="Outcome" data={dataset} labels={labels} />
        </div>
      )}
      <p className="text-lg font-semibold text-center text-text-cell">
        {title}
      </p>
    </div>
  );
};

export default PieChartComparison;
