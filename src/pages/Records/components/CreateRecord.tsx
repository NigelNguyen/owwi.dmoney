import { useState } from "react";
import Modal from "../../../components/molecules/Modal";
import CButton from "../../../components/atoms/CButton";
import { IoMdAdd } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";
import AutoComplete from "../../../components/molecules/AutoComplete";
import VerticalField from "../../../components/atoms/VerticalField";
import CInput from "../../../components/atoms/Input";
import { useCreateRecord } from "../../../apis/hooks/record";
import Overlay from "../../../components/Overlay";
import CategoryForm from "../../Categories/components/CategoryForm";
import PartnerForm from "../../Partners/components/PartnerForm";
import { useGetCategories } from "../../../apis/hooks/category";
import { useGetTypes } from "../../../apis/hooks/type";
import { IOptions } from "../../../types/common";
import { useGetPartners } from "../../../apis/hooks/partner";

const CreateRecord = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCategoryForm, setIsOpenCategoryForm] = useState(false);
  const [isOpenPartnerForm, setIsOpenPartnerForm] = useState(false);
  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      type: "",
      category: "",
      partner: "",
      amount: 0,
      description: "",
    },
  });
  const { data: categories } = useGetCategories();
  const { data: types } = useGetTypes();
  const { data: partners } = useGetPartners();
  const { mutate: createRecord, isPending } = useCreateRecord();

  const submitHandler = handleSubmit((data) => {
    createRecord(
      { ...data, amount: Number(data.amount) },
      {
        onSuccess: () => {
          console.log("Create record success");
          reset();
          setIsOpen(false);
        },
      }
    );
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
    categories?.content?.categories?.map((item) => ({
      value: item.id || "",
      label: item.name,
    })) || [];

  const typesOptions: IOptions =
    types?.content?.types?.map((item) => ({
      value: item.id || "",
      label: item.name,
    })) || [];

  const partnersOptions: IOptions =
    partners?.content?.partners?.map((item) => ({
      value: item.id || "",
      label: item.name,
    })) || [];

  return (
    <>
      <div className="flex justify-between mb-3">
        <p className="text-2xl text-white">Record List</p>
        <CButton
          label={<IoMdAdd />}
          onClick={() => setIsOpen(true)}
          variant="outlined"
        />
      </div>
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
        <form onReset={() => reset()} onSubmit={submitHandler}>
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
                  return (
                    <CInput value={value.toString()} onChange={onChange} />
                  );
                }}
              />
            </VerticalField>
          </div>
          <div className="flex gap-4">
            <CButton
              label="Create"
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
    </>
  );
};

export default CreateRecord;
