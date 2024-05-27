import { useMemo } from "react";
import { useGetStatisticCategoryMonthly } from "../../../apis/hooks/statisic";
import PieChartComparison from "./PieChartComparison";
type TDisplayPieChart = { values: Array<number>; labels: Array<string> };

const PieChartRender = () => {
  const { data: outcomeData,isFetching:isFetchingOutcomeData } = useGetStatisticCategoryMonthly({type: 'Outcome'});
  const { data: incomeData ,isFetching:isFetchingIncomeData} = useGetStatisticCategoryMonthly({type: 'Income'});
  const { data: borrowData, isFetching: isFetchingBorrowData } = useGetStatisticCategoryMonthly({type: 'Borrow'});
  const formattedOutcomeData = useMemo(() => {
    return outcomeData?.content.statistic?.reduce(
      (acc: TDisplayPieChart, item) => {
        acc.labels.push(item.categoryName);
        acc.values.push(item.totalAmount);
        return acc;
      },
      {
        labels: [],
        values: [],
      }
    );
  }, [outcomeData]);

  const formattedIncomeData = useMemo(() => {
    return incomeData?.content.statistic?.reduce(
      (acc: TDisplayPieChart, item) => {
        acc.labels.push(item.categoryName);
        acc.values.push(item.totalAmount);
        return acc;
      },
      {
        labels: [],
        values: [],
      }
    );
  }, [incomeData]);

  const formattedBorrowData = useMemo(() => {
    return borrowData?.content.statistic?.reduce(
      (acc: TDisplayPieChart, item) => {
        acc.labels.push(item.categoryName);
        acc.values.push(item.totalAmount);
        return acc;
      },
      {
        labels: [],
        values: [],
      }
    );
  }, [borrowData]);

  return (
    <>
      <div className="col-span-12 lg:col-span-4">
        <PieChartComparison
          title="Outcome"
          dataset={formattedOutcomeData?.values || []}
          labels={formattedOutcomeData?.labels || []}
          isEmpty={formattedOutcomeData?.values.length === 0}
          isLoading={isFetchingOutcomeData}
        />
      </div>
      <div className="col-span-12 lg:col-span-4">
        <PieChartComparison
          title="Income"
          dataset={formattedIncomeData?.values || []}
          labels={formattedIncomeData?.labels || []}
          isEmpty={formattedIncomeData?.values.length === 0}
          isLoading={isFetchingIncomeData}
        />
      </div>
      <div className="col-span-12 lg:col-span-4">
        <PieChartComparison
          title="Borrow"
          dataset={formattedBorrowData?.values || []}
          labels={formattedBorrowData?.labels || []}
          isEmpty={formattedBorrowData?.values.length === 0}
          isLoading={isFetchingBorrowData}
        />
      </div>
    </>
  );
};

export default PieChartRender;
