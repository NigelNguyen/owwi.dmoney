import { TableResult } from "../../../hooks/useTable";
import { TAlign } from "../../../types/constants";
import { cn } from "../../../utils/cn";

const tableAlignMap: Record<TAlign, string> = {
  center: "text-center",
  left: "text-left",
  right: "text-right",
};

const Table = <TData,>({
  tableConfig,
}: {
  tableConfig: TableResult<TData>;
}) => {
  const { columnsConfig, data, onRowClick } = tableConfig;

  return (
    <div className="p-3 bg-white text-slate-950 rounded-md w-fit">
      <table className="border-collapse">
        <thead className="border-b-2 text-slate-500">
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
        <tbody className="text-slate-800">
          {data.map((row, rowIdx) => {
            return (
              <tr
                onClick={() => onRowClick?.(row, rowIdx)}
                key={`table-row-${rowIdx}`}
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