import { TableResult } from "../../../hooks/useTable";
import { TAlign } from "../../../types/constants";
import { cn } from "../../../utils/cn";
import Spin from "../../atoms/Spin";
import { TablePagination } from "./TablePagination";

const tableAlignMap: Record<TAlign, string> = {
  center: "text-center",
  left: "text-left",
  right: "text-right",
};

const Table = <TData,>({
  tableConfig,
  isLoading = false,
  isShowPagination = false,
}: {
  tableConfig: TableResult<TData>;
  isLoading?: boolean;
  isShowPagination?: boolean;
}) => {
  const {
    columnsConfig,
    data,
    onRowClick,
    onRowDoubleClick,
    setPage,
    page,
    totalPage,
  } = tableConfig;

  const onNextClick = () => {
    if (page + 1 <= totalPage) setPage(page + 1);
  };
  const onPreviousClick = () => {
    if (page - 1 >= 1) setPage(page - 1);
  };

  return (
    <div className="w-full p-3 bg-white rounded-md">
      <table className="w-full border-collapse">
        <thead className="border-b-2 text-text-header">
          <tr key="table-header" className="mb-8">
            {columnsConfig.map((column) => (
              <th
                key={`header-table-${String(column.field)}`}
                className={cn("p-2", tableAlignMap[column.align || "left"])}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-text-cell">
          {isLoading && (
            <tr className="w-full text-center">
              <td colSpan={columnsConfig.length} className="py-8">
                <div className="flex justify-center w-full">
                  <Spin />
                </div>
              </td>
            </tr>
          )}
          {!isLoading && data.length === 0 && (
            <tr className="w-full text-center">
              <td colSpan={columnsConfig.length} className="py-8">
                No data found.
              </td>
            </tr>
          )}
          {!isLoading &&
            data.length > 0 &&
            data.map((row, rowIdx) => {
              return (
                <tr
                  onClick={() => onRowClick?.(row, rowIdx)}
                  onDoubleClick={() => onRowDoubleClick?.(row, rowIdx)}
                  key={`table-row-${rowIdx}`}
                  className={cn(
                    "hover:bg-purple-50 border-b-[1px]",
                    onRowClick || onRowDoubleClick ? "hover:cursor-pointer" : ""
                  )}
                >
                  {columnsConfig.map((column) => {
                    const isCustom = column.type === "custom";
                    const { field, align } = column;

                    const customCellRender = isCustom
                      ? column.customCellRender
                      : undefined;

                    return (
                      <td
                        className={cn("p-2", tableAlignMap[align || "left"])}
                        key={`row-table-${String(field)}-${rowIdx}`}
                      >
                        {customCellRender && isCustom
                          ? customCellRender?.(row, rowIdx)
                          : String(row[field as keyof TData])}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      {isShowPagination && (
        <div className="flex justify-end mt-2">
          <TablePagination
            page={page}
            totalPage={totalPage}
            onNextClick={onNextClick}
            onPreviousClick={onPreviousClick}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
