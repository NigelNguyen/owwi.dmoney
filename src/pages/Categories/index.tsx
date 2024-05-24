import { useEffect } from 'react'
import { IoMdAdd } from 'react-icons/io';
import CButton from '../../components/atoms/CButton';
import Table from '../../components/molecules/Table/Table';
import useTable from '../../hooks/useTable';
import { CategoryBaseDTO, useGetCategories } from '../../apis/hooks/category';

const Categories = () => {
  const { data: categories, isFetching } = useGetCategories();
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
    ],
  });

  useEffect(() => {
    if (categories?.content.categories) {
      tableConfig.setData(categories?.content.categories);
    }
  }, [categories]);

  return (
    <>
    <div className="flex justify-between mb-3">
        <p className="text-2xl text-white">Category List</p>
        <CButton
          label={<IoMdAdd />}
          // onClick={() => setIsOpen(true)}
          variant="outlined"
        />
      </div>
      <Table tableConfig={tableConfig} isLoading={isFetching} />
    </>
  );
}

export default Categories