import { IoMdAdd } from "react-icons/io";
import CButton from "../../../components/atoms/CButton";
import { useState } from "react";
import PartnerForm from "./PartnerForm";
import { TPartnerForm } from "../types";
import { useCreatePartner } from "../../../apis/hooks/partner";
import Modal from "../../../components/molecules/Modal";
import toast from "react-hot-toast";

const CreatePartner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createPartner, isPending } = useCreatePartner();

  const submitHandler = (data: TPartnerForm) => {
    createPartner(
      { ...data },
      {
        onSuccess: () => {
          toast.success("Create partner success");
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <div className="flex justify-between mb-3">
      <p className="text-2xl text-text-title">Partner List</p>
      <CButton
        label={<IoMdAdd />}
        onClick={() => setIsOpen(true)}
        variant="outlined"
      />
      <Modal
        onCloseModal={() => setIsOpen(false)}
        open={isOpen}
        title="Create Partner"
      >
        <PartnerForm
          initValues={{ description: "", name: "" }}
          submitHandler={submitHandler}
          isPending={isPending}
          submitLabel="Create"
        />
      </Modal>
    </div>
  );
};

export default CreatePartner;
