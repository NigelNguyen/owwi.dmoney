import React from "react";
import { TCategoryForm } from "../types";
import CategoryForm from "./CategoryForm";
import {
  useGetCategoryById,
  useUpdateCategory,
} from "../../../apis/hooks/category";
import Modal from "../../../components/molecules/Modal";
import toast from "react-hot-toast";

const EditCategory = ({
  categoryId,
  isOpen,
  setIsOpen,
}: {
  categoryId: string;
  isOpen?: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
  const { mutate: createCategory, isPending } = useUpdateCategory();

  const submitHandler = (data: TCategoryForm) => {
    createCategory(
      {
        ...data,
        id: categoryId,
      },
      {
        onSuccess: () => {
          toast.success("Update category success");
          setIsOpen(false);
        },
      }
    );
  };

  const { data: categoryData, isFetching: isFetchingCategory } = useGetCategoryById(
    {
      id: categoryId,
    }
  );
  const category = categoryData?.content.category;
  const initData = {
    description: category?.description || "",
    name: category?.name || "",
  };

  return (
    <Modal open={isOpen} onCloseModal={() => setIsOpen(false)}>
      <CategoryForm
        isPending={isPending || isFetchingCategory}
        submitHandler={submitHandler}
        initValues={initData}
        submitLabel="Update"
      />
    </Modal>
  );
};

export default EditCategory;
