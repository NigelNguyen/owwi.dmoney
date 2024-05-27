import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export type TBarChartDatasets = Array<{
  label: string;
  data: number[] | string[];
  backgroundColor?: string | string[] | undefined;
  borderColor?: string | string[] | undefined;
  borderWidth: number;
  borderRadius?: number;
}>;

type TBarChartProps = {
  labels: string[];
  datasets: TBarChartDatasets;
};
const BarChart = ({ labels, datasets }: TBarChartProps) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const dataDisplay = {
    labels: labels,
    datasets: datasets,
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };

  return (
    <Bar data={dataDisplay} options={options} height={"60%"} width={"100%"} />
  );
};

export default BarChart;
