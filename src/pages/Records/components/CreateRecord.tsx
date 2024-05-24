import { useState } from "react";
import CButton from "../../../components/atoms/CButton";
import { IoMdAdd } from "react-icons/io";
import { useCreateRecord } from "../../../apis/hooks/record";
import { TRecordForm } from "../type";
import RecordForm from "./RecordForm";
import { CategoryBaseDTO } from "../../../apis/hooks/category";
import { PartnerBaseDTO } from "../../../apis/hooks/partner";
import { TypeBaseDTO } from "../../../apis/hooks/type";

const CreateRecord = ({
  partners,
  categories,
  types,
}: {
  partners: PartnerBaseDTO[];
  categories: CategoryBaseDTO[];
  types: TypeBaseDTO[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createRecord, isPending } = useCreateRecord();

  const submitHandler = (data: TRecordForm) => {
    createRecord(
      {
        ...data,
        amount: Number(data.amount),
        partnerName: partners.find((item) => item.id === data.partner)?.name,
        categoryName: categories.find((item) => item.id === data.category)
          ?.name,
        typeName: types.find((item) => item.id === data.type)?.name,
      },
      {
        onSuccess: () => {
          console.log("Create record success");
          setIsOpen(false);
        },
      }
    );
  };

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
      <RecordForm
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        isPending={isPending}
        submitHandler={submitHandler}
        categories={categories}
        partners={partners}
        types={types}
        submitLabel="Create"
        initData={{
          type: "",
          category: "",
          partner: "",
          amount: 0,
          description: "",
          date: ""
        }}
      />
    </>
  );
};

export default CreateRecord;