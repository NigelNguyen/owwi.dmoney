import React from "react";
import BarChart, {
  TBarChartDatasets,
} from "../../../components/atoms/BarChart";
import EmptyChart from "./EmptyChart";
import Spin from "../../../components/atoms/Spin";

const BarChartComparison = ({
  dataset,
  title,
  isEmpty,
  isLoading,
  labels,
}: {
  dataset: TBarChartDatasets;
  title: string;
  labels: Array<string>;
  isEmpty: boolean;
  isLoading?: boolean;
}) => {
  return (
    <div className="p-4 bg-white rounded-md w-full h-full">
      {isLoading && (
        <div className="w-full flex justify-center">
          <Spin />
        </div>
      )}
      {!isLoading && isEmpty ? (
        <div className="flex items-center h-full">
          <EmptyChart className="w-full" />
        </div>
      ) : (
        <BarChart datasets={dataset} labels={labels} />
      )}
      <p className="text-lg font-semibold text-center mt-8 text-text-cell">
        {title}
      </p>
    </div>
  );
};

export default BarChartComparison;
