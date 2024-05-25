import { TableResult } from "../../../hooks/useTable";
import { TAlign } from "../../../types/constants";
import { cn } from "../../../utils/cn";
import Spin from "../../atoms/Spin";

const tableAlignMap: Record<TAlign, string> = {
  center: "text-center",
  left: "text-left",
  right: "text-right",
};

const Table = <TData,>({
  tableConfig,
  isLoading = false,
}: {
  tableConfig: TableResult<TData>;
  isLoading?: boolean;
}) => {
  const { columnsConfig, data, onRowClick, onRowDoubleClick } = tableConfig;

  return (
    <div className="p-3 bg-white rounded-md w-full max-h-[70vh] overflow-y-scroll">
      <table className="border-collapse w-full">
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
                <div className="flex w-full justify-center">
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
    </div>
  );
};

export default Table;
