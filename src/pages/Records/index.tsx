import { useEffect } from "react";
import { BaseRecordDTO, useGetRecords } from "../../apis/hooks/record";
import Table from "../../components/molecules/Table/Table";
import useTable from "../../hooks/useTable";
import CreateRecord from "./components/CreateRecord";

const Records = () => {
  const { data: records } = useGetRecords();
  console.log({ records });
  const tableConfig = useTable<BaseRecordDTO>({
    columnsConfig: [
      {
        field: "type",
        label: "Type",
        type: "normal",
      },
      {
        field: "category",
        label: "Category",
        type: "normal",
      },
      {
        field: "amount",
        label: "Amount",
        type: "custom",
        customCellRender: (data)=>{
          return data.amount.toLocaleString();
        }
      },
      {
        field: "partner",
        label: "Partner",
        type: "normal",
      },
      {
        field: "description",
        label: "Description",
        type: "normal",
      },
    ],
    onRowClick: (data) => {
      console.log({ data });
    },
  });

  useEffect(() => {
    if (records?.content.records?.length) {
      tableConfig.setData(records?.content.records);
    }
  }, [records]);

  console.log({ tableConfig: tableConfig.data });

  return (
    <div>
      <CreateRecord />
      <Table tableConfig={tableConfig} />
    </div>
  );
};

export default Records;
