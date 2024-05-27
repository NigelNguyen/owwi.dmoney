import type { ChartOptions } from "chart.js";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { COMMON_COLOR, PASTEL_COLORS } from "../../../constants/common";
type TPieChartProps = {
  label: string;
  labels?: string[];
  data: number[];
  cutout?: number;
  chartWidth?: number;
  chartTitle?: string;
};
export function PieChart({
  label,
  labels,
  data,
  cutout,
  chartWidth,
  chartTitle,
}: TPieChartProps) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const len = labels?.length;
  const isEmptyData = data.length === 0;
  const dataDisplay = {
    labels: labels,
    datasets: [
      {
        label: isEmptyData ? "Empty " + label : label,
        data: isEmptyData ? [100] : data,
        backgroundColor: isEmptyData
          ? COMMON_COLOR[0]
          : PASTEL_COLORS.slice(0, len),
        borderColor: isEmptyData
          ? COMMON_COLOR[0]
          : PASTEL_COLORS.slice(0, len),
        borderWidth: 1,
      },
    ],
  };
  const options: ChartOptions<"doughnut"> = {
    maintainAspectRatio: true,
    cutout: cutout || 80,
    layout: {
      padding: 0,
    },
    responsive: true,
    plugins: {
      legend: {
        labels: {
          padding: 10,
          boxWidth: 15,
        },
        display: false,
      },
    },
  };

  return (
    <>
      <Doughnut
        data={dataDisplay}
        style={{
          width: chartWidth ? chartWidth : "100%",
          height: "max-content",
          blockSize: "max-content",
        }}
        options={options}
      />
      <p className="text-center mt-2 font-normal">{chartTitle}</p>
    </>
  );
}
