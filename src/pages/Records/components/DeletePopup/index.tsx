import toast from "react-hot-toast";
import { useDeleteRecordById } from "../../../../apis/hooks/record";
import CButton from "../../../../components/atoms/CButton";
import Modal from "../../../../components/molecules/Modal";

const DeleteRecordPopup = ({
  id,
  open,
  setOpenModal,
}: {
  id: string;
  open: boolean;
  setOpenModal: (value: boolean) => void;
}) => {
  const { mutateAsync: deleteRecord } = useDeleteRecordById();
  const closeModal = () => setOpenModal(false);
  const onDeleteRecord = async () => {
    await deleteRecord(
      { id },
      {
        onSuccess: () => {
          toast.success("Delete record success");
          closeModal();
        },
        onError: () => {
          toast.error("Delete record failed");
          closeModal();
        },
      }
    );
  };

  return (
    <Modal open={open} onCloseModal={closeModal} title="Warning!">
      <p className="mb-6 text-xl">Do you want to delete this record?</p>
      <div className="flex gap-2">
        <CButton label="Cancel" onClick={closeModal} />
        <CButton
          label="Delete"
          onClick={onDeleteRecord}
          className="bg-red-500 hover:bg-red-400"
        />
      </div>
    </Modal>
  );
};

export default DeleteRecordPopup;
