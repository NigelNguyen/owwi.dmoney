import { IoMdAdd } from "react-icons/io";
import CButton from "../../../components/atoms/CButton";
import { useState } from "react";
import CategoryForm from "./CategoryForm";
import { TCategoryForm } from "../types";
import { useCreateCategory } from "../../../apis/hooks/category";
import Modal from "../../../components/molecules/Modal";
import toast from "react-hot-toast";

const CreateCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createCategory, isPending } = useCreateCategory();

  const submitHandler = (data: TCategoryForm) => {
    createCategory(
      { ...data },
      {
        onSuccess: () => {
          toast.success("Create category success");
          setIsOpen(false)
        },
      }
    );
  };

  return (
    <div className="flex justify-between mb-3">
      <p className="text-2xl text-text-title">Category List</p>
      <CButton
        label={<IoMdAdd />}
        onClick={() => setIsOpen(true)}
        variant="outlined"
      />
      <Modal onCloseModal={() => setIsOpen(false)} open={isOpen} title="Create Category">
        <CategoryForm
          initValues={{ description: "", name: "" }}
          submitHandler={submitHandler}
          isPending={isPending}
          submitLabel="Create"
        />
      </Modal>
    </div>
  );
};

export default CreateCategory;
