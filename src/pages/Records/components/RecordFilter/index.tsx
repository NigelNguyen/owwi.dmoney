import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TRecordFilter, recordFilterSchema } from "../../type";
import CInput from "../../../../components/atoms/Input";
import VerticalField from "../../../../components/atoms/VerticalField";
import AutoComplete from "../../../../components/molecules/AutoComplete";
import CButton from "../../../../components/atoms/CButton";
import { IOptions } from "../../../../types/common";
import { PartnerBaseDTO } from "../../../../apis/hooks/partner";
import { CategoryBaseDTO } from "../../../../apis/hooks/category";
import { TypeBaseDTO } from "../../../../apis/hooks/type";

const RecordFilter = ({
  partners,
  categories,
  types,
  isPending,
  setFilter,
}: {
  partners: PartnerBaseDTO[];
  categories: CategoryBaseDTO[];
  types: TypeBaseDTO[];
  isPending?: boolean;
  setFilter: (filter: TRecordFilter) => void;
}) => {
  const { control, handleSubmit } = useForm<TRecordFilter>({
    resolver: zodResolver(recordFilterSchema),
  });

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

  const onSubmit = handleSubmit((data: TRecordFilter) => {
    setFilter(data);
  });

  return (
    <>
      <h1 className="mb-3 text-2xl font-normal">Filter Records</h1>
      <form onSubmit={onSubmit} className="p-4 mb-8 bg-white rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-1 gap-x-4">
          <VerticalField label="Category">
            <Controller
              control={control}
              name="category"
              render={({
                field: { value = "", onChange },
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
          </VerticalField>

          <VerticalField label="Partner">
            <Controller
              control={control}
              name="partner"
              render={({
                field: { value = "", onChange },
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
          </VerticalField>

          <VerticalField label="Type">
            <Controller
              control={control}
              name="type"
              render={({
                field: { value = "", onChange },
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

          <VerticalField label="Amount from">
            <Controller
              control={control}
              name="min"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <CInput
                    value={value?.toString() || ""}
                    onChange={onChange}
                    type="number"
                    min={0}
                    errorMessage={error?.message}
                  />
                );
              }}
            />
          </VerticalField>

          <VerticalField label="Amount to">
            <Controller
              control={control}
              name="max"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <CInput
                    value={value?.toString() || ""}
                    onChange={onChange}
                    type="number"
                    min={0}
                    errorMessage={error?.message}
                  />
                );
              }}
            />
          </VerticalField>

          <VerticalField label="From Date">
            <Controller
              control={control}
              name="from"
              render={({
                field: { value = "", onChange },
                fieldState: { error },
              }) => {
                return (
                  <CInput
                    value={value?.toString()}
                    onChange={onChange}
                    type="date"
                    errorMessage={error?.message}
                  />
                );
              }}
            />
          </VerticalField>
          <VerticalField label="To Date">
            <Controller
              control={control}
              name="to"
              render={({
                field: { value = "", onChange },
                fieldState: { error },
              }) => {
                return (
                  <CInput
                    value={value?.toString()}
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
            label="Filter"
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
    </>
  );
};

export default RecordFilter;
