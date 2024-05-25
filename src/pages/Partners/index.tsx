import { useEffect, useState } from "react";
import Table from "../../components/molecules/Table/Table";
import useTable from "../../hooks/useTable";
import { PartnerBaseDTO, useGetPartners } from "../../apis/hooks/partner";
import CreatePartner from "./components/CreatePartner";
import CButton from "../../components/atoms/CButton";
import { FaPencil } from "react-icons/fa6";
import EditPartner from "./components/EditPartner";

const Partners = () => {
  const { data: partners, isFetching } = useGetPartners();
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [editId, setEditId] = useState("");
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
    if (partners?.content.partners) {
      tableConfig.setData(partners?.content.partners);
    }
  }, [partners]);

  return (
    <>
      <CreatePartner />
      {isOpenEditForm && (
        <EditPartner
          isOpen={isOpenEditForm}
          partnerId={editId}
          setIsOpen={setIsOpenEditForm}
        />
      )}
      <Table tableConfig={tableConfig} isLoading={isFetching} />
    </>
  );
};

export default Partners;
