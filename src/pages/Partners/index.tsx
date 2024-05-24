import { useEffect } from "react";
import Table from "../../components/molecules/Table/Table";
import useTable from "../../hooks/useTable";
import { PartnerBaseDTO, useGetPartners } from "../../apis/hooks/partner";
import CButton from "../../components/atoms/CButton";
import { IoMdAdd } from "react-icons/io";

const Partners = () => {
  const { data: partners, isFetching } = useGetPartners();
  const tableConfig = useTable<PartnerBaseDTO>({
    columnsConfig: [
      {
        type: "normal",
        field: "name",
        label: "Partner Name",
      },
      {
        type: "normal",
        field: "description",
        label: "Partner Description",
      },
    ],
  });

  useEffect(() => {
    if (partners?.content.partners) {
      tableConfig.setData(partners?.content.partners);
    }
  }, [partners]);

  return (
    <>
    <div className="flex justify-between mb-3">
        <p className="text-2xl text-white">Partner List</p>
        <CButton
          label={<IoMdAdd />}
          // onClick={() => setIsOpen(true)}
          variant="outlined"
        />
      </div>
      <Table tableConfig={tableConfig} isLoading={isFetching} />
    </>
  );
};

export default Partners;
