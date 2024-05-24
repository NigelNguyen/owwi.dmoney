import { Controller, useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import CButton from "../../../../components/atoms/CButton";
import CInput from "../../../../components/atoms/Input";
import VerticalField from "../../../../components/atoms/VerticalField";
import AutoComplete from "../../../../components/molecules/AutoComplete";
import { TRecordForm } from "../../type";
import { useEffect, useState } from "react";
import Overlay from "../../../../components/Overlay";
import CategoryForm from "../../../Categories/components/CategoryForm";
import PartnerForm from "../../../Partners/components/PartnerForm";
import Modal from "../../../../components/molecules/Modal";
import { IOptions } from "../../../../types/common";
import { PartnerBaseDTO } from "../../../../apis/hooks/partner";
import { CategoryBaseDTO } from "../../../../apis/hooks/category";
import { TypeBaseDTO } from "../../../../apis/hooks/type";

const RecordForm = ({
  submitHandler,
  isPending,
  isOpen,
  setIsOpen,
  partners,
  categories,
  types,
  initData,
  submitLabel
}: {
  submitHandler: (data: TRecordForm) => void;
  isPending?: boolean;
  isOpen?: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  partners: PartnerBaseDTO[];
  categories: CategoryBaseDTO[];
  types: TypeBaseDTO[];
  initData?: TRecordForm;
  submitLabel:string;
}) => {
  const [isOpenCategoryForm, setIsOpenCategoryForm] = useState(false);
  const [isOpenPartnerForm, setIsOpenPartnerForm] = useState(false);
  const { control, reset, handleSubmit } = useForm<TRecordForm>({
    defaultValues: initData,
  });

  const onSubmit = handleSubmit((data) => {
    submitHandler(data);
  });

  const otherForms = (
    <div className="flex flex-col gap-4">
      {isOpenCategoryForm && (
        <Overlay
          className="min-w-72"
          onClickCloseButton={() => setIsOpenCategoryForm(false)}
        >
          <CategoryForm />
        </Overlay>
      )}
      {isOpenPartnerForm && (
        <Overlay
          className="min-w-72"
          onClickCloseButton={() => setIsOpenPartnerForm(false)}
        >
          <PartnerForm />
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
      title="Create Record"
      nextOverlay={otherForms}
    >
      <form onReset={reset} onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <VerticalField label="Category">
            <div className="flex gap-2">
              <Controller
                control={control}
                name="category"
                render={({ field: { value, onChange } }) => {
                  return (
                    <AutoComplete
                      value={value}
                      onChange={onChange}
                      options={categoriesOptions}
                    />
                  );
                }}
              />
              <CButton
                label={<IoMdAdd />}
                type="button"
                onClick={() => setIsOpenCategoryForm(true)}
                title="Create New Category"
              />
            </div>
          </VerticalField>
          <VerticalField label="Partner">
            <div className="flex gap-2">
              <Controller
                control={control}
                name="partner"
                render={({ field: { value, onChange } }) => {
                  return (
                    <AutoComplete
                      value={value}
                      onChange={onChange}
                      options={partnersOptions}
                    />
                  );
                }}
              />
              <CButton
                label={<IoMdAdd />}
                type="button"
                onClick={() => setIsOpenPartnerForm(true)}
                title="Create New Partner"
              />
            </div>
          </VerticalField>
          <VerticalField label="Type">
            <Controller
              control={control}
              name="type"
              render={({ field: { value, onChange } }) => {
                return (
                  <AutoComplete
                    value={value}
                    onChange={onChange}
                    options={typesOptions}
                  />
                );
              }}
            />
          </VerticalField>
          <VerticalField label="Amount">
            <Controller
              control={control}
              name="amount"
              render={({ field: { value, onChange } }) => {
                return (
                  <CInput
                    value={value.toString()}
                    onChange={onChange}
                    type="number"
                    min={0}
                    step={0.1}
                  />
                );
              }}
            />
          </VerticalField>
          <VerticalField label="Description">
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => {
                return <CInput value={value.toString()} onChange={onChange} />;
              }}
            />
          </VerticalField>
          <VerticalField label="Date">
            <Controller
              control={control}
              name="date"
              render={({ field: { value, onChange } }) => {
                return <CInput value={value.toString()} onChange={onChange} type="date"/>;
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
