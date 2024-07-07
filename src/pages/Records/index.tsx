import { useEffect, useState } from "react";
import { BaseRecordDTO, useGetRecords } from "../../apis/hooks/record";
import Table from "../../components/molecules/Table/Table";
import useTable from "../../hooks/useTable";
import CreateRecord from "./components/CreateRecord";
import CButton from "../../components/atoms/CButton";
import { FaTrash } from "react-icons/fa6";
import { useGetPartners } from "../../apis/hooks/partner";
import { useGetTypes } from "../../apis/hooks/type";
import EditRecord from "./components/EditRecord";
import { useGetCategories } from "../../apis/hooks/category";
import RecordFilter from "./components/RecordFilter";
import { TRecordFilter } from "./type";
import DeleteRecordPopup from "./components/DeletePopup";

const Records = () => {
  const [filter, setFilter] = useState<TRecordFilter>({});
  const tableConfig = useTable<BaseRecordDTO>({
    columnsConfig: [
      {
        field: "date",
        label: "Date",
        type: "normal",
      },
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
        field: "partner",
        label: "Partner",
        type: "normal",
      },
      {
        field: "description",
        label: "Description",
        type: "normal",
      },
      {
        field: "amount",
        label: "Amount",
        align: "right",
        type: "custom",
        customCellRender: (data) => {
          return data.amount.toLocaleString();
        },
      },
      {
        field: "actions",
        label: "Actions",
        align: "right",
        type: "custom",
        customCellRender: (data) => {
          return (
            <div className="flex justify-end gap-2">
              <CButton
                label={<FaTrash />}
                variant="outlined"
                className="px-2 text-red-500 border-red-500 hover:border-red-600 hover:text-white hover:bg-red-500"
                onClick={() => {
                  setSelectedId(data.id || "");
                  setIsOpenDelete(true);
                }}
              />
            </div>
          );
        },
      },
    ],
    onRowDoubleClick: (data) => {
      setSelectedId(data.id || "");
      setIsOpenEditForm(true);
    },
  });
  const { data: records, isFetching } = useGetRecords({
    ...filter,
    page: tableConfig.page,
    pageSize: 10,
  });
  const { data: categories } = useGetCategories();
  const { data: types } = useGetTypes();
  const { data: partners } = useGetPartners();
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    tableConfig.setData(records?.content.records || []);
    tableConfig.setTotalPage(records?.pagination.total ?? 0);
    records?.pagination.page &&
      tableConfig.setPage(records?.pagination.page ?? 1);
  }, [records]);

  return (
    <>
      <RecordFilter
        categories={categories?.content.categories || []}
        partners={partners?.content.partners || []}
        types={types?.content.types || []}
        setFilter={setFilter}
        isPending={isFetching}
      />
      <CreateRecord
        categories={categories?.content.categories || []}
        partners={partners?.content.partners || []}
        types={types?.content.types || []}
      />
      {isOpenEditForm && (
        <EditRecord
          recordId={selectedId}
          isOpen={isOpenEditForm}
          setIsOpen={setIsOpenEditForm}
          categories={categories?.content.categories || []}
          partners={partners?.content.partners || []}
          types={types?.content.types || []}
        />
      )}
      {isOpenDelete && (
        <DeleteRecordPopup
          id={selectedId}
          setOpenModal={setIsOpenDelete}
          open={isOpenDelete}
        />
      )}
      <Table tableConfig={tableConfig} isLoading={isFetching} isShowPagination/>
    </>
  );
};

export default Records;
