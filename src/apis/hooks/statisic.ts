import { UseQueryResult, useQuery } from "@tanstack/react-query";
import createAxios from "../axios";
import { AxiosError } from "axios";

const queryKey = {
  categoryMonthly: "statistic-category-monthly",
  currentWeek: "statistic-current-week",
  previousWeek: "statistic-previous-week",
  currentMonth: "statistic-current-month",
  previousMonth: "statistic-previous-month",
  yearly: "statistic-yearly",
};

export type TStatisticQuery = {
  type: "Income" | "Outcome" | "Borrow" | "Loan" | 'Saving';
};

export type TCategoryStatistic = {
  message: string;
  content: {
    statistic: Array<{
      categoryName: string;
      totalAmount: number;
    }>;
  };
};

export type TGeneralStatistic = {
  message: string;
  content: {
    statistic: Array<{
      date: string;
      totalAmount: number;
    }>;
  };
};

export type TYearlyStatistic = {
  message: string;
  content: {
    statistic: Array<{
      date: string;
      totalAmount: number;
    }>;
    labels: Array<string>;
  };
};

export const useGetStatisticCategoryMonthly = ({
  type,
}: TStatisticQuery): UseQueryResult<TCategoryStatistic, AxiosError> => {
  return useQuery({
    queryKey: [queryKey.categoryMonthly, type],
    queryFn: () => {
      return createAxios.get(`/statistic/category-monthly/${type}`);
    },
  });
};

export const useGetStatisticWeekly = (): UseQueryResult<
  TGeneralStatistic,
  AxiosError
> => {
  return useQuery({
    queryKey: [queryKey.currentWeek],
    queryFn: () => {
      return createAxios.get("/statistic/weekly");
    },
  });
};

export const useGetStatisticPreviousWeekly = (): UseQueryResult<
  TGeneralStatistic,
  AxiosError
> => {
  return useQuery({
    queryKey: [queryKey.previousWeek],
    queryFn: () => {
      return createAxios.get("/statistic/previous-weekly");
    },
  });
};

export const useGetStatisticMonthly = (): UseQueryResult<
  TGeneralStatistic,
  AxiosError
> => {
  return useQuery({
    queryKey: [queryKey.currentMonth],
    queryFn: () => {
      return createAxios.get("/statistic/monthly");
    },
  });
};

export const useGetStatisticPreviousMonthly = (): UseQueryResult<
  TGeneralStatistic,
  AxiosError
> => {
  return useQuery({
    queryKey: [queryKey.previousMonth],
    queryFn: () => {
      return createAxios.get("/statistic/previous-monthly");
    },
  });
};

export const useGetStatisticYearly = (): UseQueryResult<
  TYearlyStatistic,
  AxiosError
> => {
  return useQuery({
    queryKey: [queryKey.yearly],
    queryFn: () => {
      return createAxios.get("/statistic/yearly");
    },
  });
};
