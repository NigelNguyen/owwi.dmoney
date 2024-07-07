import React from "react";
import { CategoryBaseDTO } from "../../../apis/hooks/category";
import { PartnerBaseDTO } from "../../../apis/hooks/partner";
import { TypeBaseDTO } from "../../../apis/hooks/type";
import RecordForm from "./RecordForm";
import { useGetRecordById, useUpdateRecord } from "../../../apis/hooks/record";
import { TRecordForm } from "../type";
import toast from "react-hot-toast";

const EditRecord = ({
  recordId,
  partners,
  categories,
  types,
  isOpen,
  setIsOpen,
}: {
  recordId: string;
  isOpen?: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  partners: PartnerBaseDTO[];
  categories: CategoryBaseDTO[];
  types: TypeBaseDTO[];
}) => {
  const { mutate: updateRecord, isPending } = useUpdateRecord();

  const submitHandler = (data: TRecordForm) => {
    updateRecord(
      {
        ...data,
        id: recordId,
        amount: Number(data.amount),
        partnerName: partners.find((item) => item.id === data.partner)?.name,
        categoryName: categories.find((item) => item.id === data.category)
          ?.name,
        typeName: types.find((item) => item.id === data.type)?.name,
      },
      {
        onSuccess: () => {
          toast.success("Update record success");
          setIsOpen(false);
        },
      }
    );
  };

  const { data: recordData, isFetching: isFetchingRecord } = useGetRecordById({
    id: recordId,
  });
  const record = recordData?.content.record;
  const initData = {
    type: record?.type || "",
    category: record?.category || "",
    partner: record?.partner || "",
    amount: record?.amount.toString() || "",
    description: record?.description || "",
    date: record?.date.split("T")[0] || "",
  };

  return (
    <RecordForm
      title="Edit Record"
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      isPending={isPending || isFetchingRecord}
      submitHandler={submitHandler}
      categories={categories}
      partners={partners}
      types={types}
      initData={initData}
      submitLabel="Update"
    />
  );
};

export default EditRecord;
