import Table from "../../components/molecules/Table/Table";
import useTable from "../../hooks/useTable";

const Records = () => {
  const tableConfig = useTable({
    columnsConfig: [
      {
        field: "name",
        label: "Name",
        align: "right",
        type: "normal",
      },
      {
        field: "address",
        label: "Address",
        type: "custom",
        customCellRender(data) {
          return (
            <span className="px-2 bg-slate-700 text-white">{data.address}</span>
          );
        },
      },
    ],
    initData: [
      { name: "Nguyen Van C", address: "51 Ton Duc Thang" },
      { name: "Nguyen Van B", address: "52 Ton Duc Thang" },
      { name: "Nguyen Van A" },
    ],
    onRowClick: (data) => {
      console.log({ data });
    },
  });

  return (
    <div>
      <Table tableConfig={tableConfig} />
    </div>
  );
};

export default Records;
