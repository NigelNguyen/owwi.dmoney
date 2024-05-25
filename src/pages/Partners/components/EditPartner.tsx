import React from "react";
import { TPartnerForm } from "../types";
import PartnerForm from "./PartnerForm";
import {
  useGetPartnerById,
  useUpdatePartner,
} from "../../../apis/hooks/partner";
import Modal from "../../../components/molecules/Modal";

const EditPartner = ({
  partnerId,
  isOpen,
  setIsOpen,
}: {
  partnerId: string;
  isOpen?: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
  const { mutate: createRecord, isPending } = useUpdatePartner();

  const submitHandler = (data: TPartnerForm) => {
    createRecord(
      {
        ...data,
        id: partnerId,
      },
      {
        onSuccess: () => {
          console.log("Update partner success");
          setIsOpen(false);
        },
      }
    );
  };

  const { data: partnerData, isFetching: isFetchingPartner } = useGetPartnerById(
    {
      id: partnerId,
    }
  );
  const partner = partnerData?.content.partner;
  const initData = {
    description: partner?.description || "",
    name: partner?.name || "",
  };

  return (
    <Modal open={isOpen} onCloseModal={() => setIsOpen(false)}>
      <PartnerForm
        isPending={isPending || isFetchingPartner}
        submitHandler={submitHandler}
        initValues={initData}
        submitLabel="Update"
      />
    </Modal>
  );
};

export default EditPartner;
