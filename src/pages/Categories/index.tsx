import { useEffect, useState } from "react";
import Table from "../../components/molecules/Table/Table";
import useTable from "../../hooks/useTable";
import { CategoryBaseDTO, useGetCategories } from "../../apis/hooks/category";
import CreateCategory from "./components/CreateCategory";
import CButton from "../../components/atoms/CButton";
import { FaPencil } from "react-icons/fa6";
import EditCategory from "./components/EditCategory";

const Categories = () => {
  const { data: categories, isFetching } = useGetCategories();
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [editId, setEditId] = useState("");

  const tableConfig = useTable<CategoryBaseDTO>({
    columnsConfig: [
      {
        type: "normal",
        field: "name",
        label: "Category Name",
      },
      {
        type: "normal",
        field: "description",
        label: "Category Description",
      },
      {
        field: "actions",
        label: "Actions",
        align: "right",
        type: "custom",
        customCellRender: (data) => {
          return (
            <CButton
              label={<FaPencil />}
              variant="outlined"
              className="px-2"
              onClick={() => {
                setEditId(data.id || "");
                setIsOpenEditForm(true);
              }}
            />
          );
        },
      },
    ],
    onRowDoubleClick: (data) => {
      setEditId(data.id || "");
      setIsOpenEditForm(true);
    },
  });

  useEffect(() => {
    if (categories?.content.categories) {
      tableConfig.setData(categories?.content.categories);
    }
  }, [categories]);

  return (
    <>
      <CreateCategory />
      {isOpenEditForm && (
        <EditCategory
          isOpen={isOpenEditForm}
          categoryId={editId}
          setIsOpen={setIsOpenEditForm}
        />
      )}
      <Table tableConfig={tableConfig} isLoading={isFetching} />
    </>
  );
};

export default Categories;
