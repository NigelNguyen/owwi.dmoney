import { useMemo } from "react";
import {
  useGetStatisticMonthly,
  useGetStatisticPreviousMonthly,
  useGetStatisticPreviousWeekly,
  useGetStatisticWeekly,
  useGetStatisticYearly,
} from "../../../apis/hooks/statisic";
import { COMMON_COLOR } from "../../../constants/common";
import BarChartComparison from "./BarChartComparison";

const BarChartRender = () => {
  const { data: thisWeekData, isFetching: isFetchingThisWeekData } =
    useGetStatisticWeekly();
  const { data: previousWeekData, isFetching: isFetchingPreviousWeekData } =
    useGetStatisticPreviousWeekly();

  const { data: monthlyData, isFetching: isFetchingMonthlyData } =
    useGetStatisticMonthly();
  const {
    data: previousMonthlyData,
    isFetching: isFetchingPreviousMonthlyData,
  } = useGetStatisticPreviousMonthly();
  const { data: yearlyData, isFetching: isFetchingYearlyData } =
    useGetStatisticYearly();

  const weeklyDataset = useMemo(() => {
    return [
      {
        label: "Last Week",
        data:
          previousWeekData?.content?.statistic.map(
            (item) => item.totalAmount
          ) || [],
        backgroundColor: COMMON_COLOR[0],
        borderColor: COMMON_COLOR[0],
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "This Week",
        data:
          thisWeekData?.content?.statistic?.map((item) => item.totalAmount) ||
          [],
        backgroundColor: COMMON_COLOR[1],
        borderColor: COMMON_COLOR[1],
        borderWidth: 1,
        borderRadius: 10,
      },
    ];
  }, [thisWeekData, previousWeekData]);

  const monthlyDataset = useMemo(() => {
    return [
      {
        label: "Last Year",
        data:
          previousMonthlyData?.content?.statistic.map(
            (item) => item.totalAmount
          ) || [],
        backgroundColor: COMMON_COLOR[0],
        borderColor: COMMON_COLOR[0],
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "This Year",
        data:
          monthlyData?.content?.statistic?.map((item) => item.totalAmount) ||
          [],
        backgroundColor: COMMON_COLOR[1],
        borderColor: COMMON_COLOR[1],
        borderWidth: 1,
        borderRadius: 10,
      },
    ];
  }, [monthlyData, previousMonthlyData]);

  const yearlyDataset = useMemo(() => {
    return [
      {
        label: "Yearly Outcome",
        data:
          yearlyData?.content?.statistic.map((item) => item.totalAmount) || [],
        backgroundColor: COMMON_COLOR[1],
        borderColor: COMMON_COLOR[1],
        borderWidth: 1,
        borderRadius: 10,
      },
    ];
  }, [yearlyData]);

  return (
    <>
      <div className="col-span-12 lg:col-span-6">
        <BarChartComparison
          dataset={weeklyDataset}
          isEmpty={
            !thisWeekData?.content?.statistic.length &&
            !previousWeekData?.content?.statistic.length
          }
          title="Weekly Outcome"
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          isLoading={isFetchingThisWeekData || isFetchingPreviousWeekData}
        />
      </div>
      <div className="col-span-12 lg:col-span-6">
        <BarChartComparison
          dataset={yearlyDataset}
          labels={yearlyData?.content?.labels || []}
          isEmpty={!yearlyData?.content?.statistic.length}
          title="Last 5 years Outcome"
          isLoading={isFetchingYearlyData}
        />
      </div>
      <div className="col-span-2" />
      <div className="col-span-12 lg:col-span-8">
        <BarChartComparison
          dataset={monthlyDataset}
          isEmpty={
            !monthlyData?.content?.statistic.length &&
            !previousMonthlyData?.content?.statistic.length
          }
          labels={[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ]}
          title="Monthly Outcome"
          isLoading={isFetchingMonthlyData || isFetchingPreviousMonthlyData}
        />
      </div>
    </>
  );
};

export default BarChartRender;
