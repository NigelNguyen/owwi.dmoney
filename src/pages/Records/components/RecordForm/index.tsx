import { Controller, useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import CButton from "../../../../components/atoms/CButton";
import CInput from "../../../../components/atoms/Input";
import VerticalField from "../../../../components/atoms/VerticalField";
import AutoComplete from "../../../../components/molecules/AutoComplete";
import { TRecordForm, recordFormSchema } from "../../type";
import { useEffect, useState } from "react";
import Overlay from "../../../../components/Overlay";
import CategoryForm from "../../../Categories/components/CategoryForm";
import PartnerForm from "../../../Partners/components/PartnerForm";
import Modal from "../../../../components/molecules/Modal";
import { IOptions } from "../../../../types/common";
import {
  PartnerBaseDTO,
  useCreatePartner,
} from "../../../../apis/hooks/partner";
import {
  CategoryBaseDTO,
  useCreateCategory,
} from "../../../../apis/hooks/category";
import { TypeBaseDTO } from "../../../../apis/hooks/type";
import { TPartnerForm } from "../../../Partners/types";
import { TCategoryForm } from "../../../Categories/types";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const RecordForm = ({
  submitHandler,
  isPending,
  isOpen,
  setIsOpen,
  partners,
  categories,
  types,
  initData,
  submitLabel,
  title,
}: {
  submitHandler: (data: TRecordForm) => void;
  isPending?: boolean;
  isOpen?: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  partners: PartnerBaseDTO[];
  categories: CategoryBaseDTO[];
  types: TypeBaseDTO[];
  initData?: TRecordForm;
  submitLabel: string;
  title: string;
}) => {
  const [isOpenCategoryForm, setIsOpenCategoryForm] = useState(false);
  const [isOpenPartnerForm, setIsOpenPartnerForm] = useState(false);
  const { control, reset, handleSubmit } = useForm<TRecordForm>({
    resolver: zodResolver(recordFormSchema),
    defaultValues: initData,
  });

  const onSubmit = handleSubmit((data) => {
    submitHandler(data);
  });

  const { mutate: createPartner, isPending: isPendingCreatePartner } =
    useCreatePartner();
  const createPartnerHandler = (data: TPartnerForm) => {
    createPartner(
      { ...data },
      {
        onSuccess: () => {
          toast.success("Create partner success");
        },
      }
    );
  };

  const { mutate: createCategory, isPending: isPendingCreateCategory } =
    useCreateCategory();

  const createCategoryHandler = (data: TCategoryForm) => {
    createCategory(
      { ...data },
      {
        onSuccess: () => {
          toast.success("Create category success");
        },
      }
    );
  };

  const otherForms = (
    <div className="flex flex-col gap-4">
      {isOpenCategoryForm && (
        <Overlay
          className="min-w-72"
          onClickCloseButton={() => setIsOpenCategoryForm(false)}
        >
          <CategoryForm
            submitLabel="Create"
            isPending={isPendingCreateCategory}
            initValues={{ description: "", name: "" }}
            submitHandler={createCategoryHandler}
          />
        </Overlay>
      )}
      {isOpenPartnerForm && (
        <Overlay
          className="min-w-72"
          onClickCloseButton={() => setIsOpenPartnerForm(false)}
        >
          <PartnerForm
            initValues={{ description: "", name: "" }}
            submitHandler={createPartnerHandler}
            isPending={isPendingCreatePartner}
            submitLabel="Create"
          />
        </Overlay>
      )}
    </div>
  );

  const categoriesOptions: IOptions =
    categories?.map((item) => ({
      value: item.id || "",
      label: item.name,
    })) || [];

  const typesOptions: IOptions =
    types?.map((item) => ({
      value: item.id || "",
      label: item.name,
    })) || [];

  const partnersOptions: IOptions =
    partners?.map((item) => ({
      value: item.id || "",
      label: item.name,
    })) || [];

  useEffect(() => {
    if (initData && !isPending) {
      reset(initData);
    }
  }, [initData]);

  return (
    <Modal
      open={isOpen}
      onCloseModal={() => {
        reset();
        setIsOpen(false);
      }}
      className="min-w-[400px]"
      title={title}
      nextOverlay={otherForms}
    >
      <form onReset={reset} onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <VerticalField label="Category">
            <div className="flex gap-2">
              <Controller
                control={control}
                name="category"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <AutoComplete
                      value={value}
                      onChange={onChange}
                      options={categoriesOptions}
                      errorMessage={error?.message}
                    />
                  );
                }}
              />
              <CButton
                label={<IoMdAdd />}
                type="button"
                onClick={() => setIsOpenCategoryForm(true)}
                title="Create New Category"
                className="h-fit py-[9px]"
              />
            </div>
          </VerticalField>
          <VerticalField label="Partner">
            <div className="flex gap-2">
              <Controller
                control={control}
                name="partner"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <AutoComplete
                      value={value}
                      onChange={onChange}
                      options={partnersOptions}
                      errorMessage={error?.message}
                    />
                  );
                }}
              />
              <CButton
                label={<IoMdAdd />}
                type="button"
                onClick={() => setIsOpenPartnerForm(true)}
                title="Create New Partner"
                className="h-fit py-[9px]"
              />
            </div>
          </VerticalField>
          <VerticalField label="Type">
            <Controller
              control={control}
              name="type"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <AutoComplete
                    value={value}
                    onChange={onChange}
                    options={typesOptions}
                    errorMessage={error?.message}
                  />
                );
              }}
            />
          </VerticalField>
          <VerticalField label="Amount">
            <Controller
              control={control}
              name="amount"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <CInput
                    value={value.toString()}
                    onChange={onChange}
                    type="number"
                    min={0}
                    errorMessage={error?.message}
                  />
                );
              }}
            />
          </VerticalField>
          <VerticalField label="Description">
            <Controller
              control={control}
              name="description"
              render={({
                field: { value = "", onChange },
                fieldState: { error },
              }) => {
                return (
                  <CInput
                    value={value}
                    onChange={onChange}
                    errorMessage={error?.message}
                  />
                );
              }}
            />
          </VerticalField>
          <VerticalField label="Date">
            <Controller
              control={control}
              name="date"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <CInput
                    value={value.toString()}
                    onChange={onChange}
                    type="date"
                    errorMessage={error?.message}
                  />
                );
              }}
            />
          </VerticalField>
        </div>
        <div className="flex gap-4">
          <CButton
            label={submitLabel}
            className="mt-6"
            type="submit"
            disabled={isPending}
          />
          <CButton
            label="Reset"
            className="mt-6"
            type="reset"
            variant="outlined"
            disabled={isPending}
          />
        </div>
      </form>
    </Modal>
  );
};

export default RecordForm;
