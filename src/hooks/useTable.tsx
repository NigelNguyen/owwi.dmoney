import React, { useMemo, useState } from "react";
import { TAlign, TSort } from "../types/constants";

export type TSortState = {
  field: string;
  order: TSort;
};
export interface IBaseColumnConfig<TBodyData> {
  field: keyof TBodyData | string;
  label: string | React.ReactNode;
  align?: TAlign;
}

export interface IBaseColumnConfigNormal<TBodyData>
  extends IBaseColumnConfig<TBodyData> {
  type: "normal";
  field: keyof TBodyData;
}

export interface IBaseColumnConfigCustom<TBodyData>
  extends IBaseColumnConfig<TBodyData> {
  type: "custom";
  field: keyof TBodyData | string;
  customCellRender: (data: TBodyData, index: number) => React.ReactNode;
}

export type TColumnConfig<TBodyData> =
  | IBaseColumnConfigNormal<TBodyData>
  | IBaseColumnConfigCustom<TBodyData>;

export type TableResult<TData> = {
  columnsConfig: TColumnConfig<TData>[];
  data: TData[];
  onRowClick: ((data: TData, index: number) => void) | undefined;
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
  setSort: React.Dispatch<React.SetStateAction<TSortState>>
};

const useTable = <TData,>({
  columnsConfig,
  initData = [],
  onRowClick,
}: {
  columnsConfig: TColumnConfig<TData>[];
  initData?: TData[];
  onRowClick?: (data: TData, index: number) => void;
}) => {
  const [data, setData] = useState(initData);
  const [sort, setSort] = useState<TSortState>({
    field: "",
    order: "none",
  });
  const displayData = useMemo(() => {
    if (sort.order !== "none") {
      const field = sort.field as keyof TData;
      return data.sort((a, b) =>
        sort.order === "asc"
          ? a[field] > b[field]
            ? -1
            : 1
          : a[field] > b[field]
          ? 1
          : -1
      );
    } else {
      return [...data.map((item) => ({ ...item }))];
    }
  }, [sort, data]);

  return {
    columnsConfig,
    data: displayData,
    onRowClick,
    setData,
    setSort,
  };
};

export default useTable;