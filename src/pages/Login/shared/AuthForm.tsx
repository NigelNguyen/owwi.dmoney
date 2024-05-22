import { Controller, useForm } from "react-hook-form";
import { TUserForm } from "./schema";
import CInput from "../../../components/atoms/Input";
import VerticalField from "../../../components/atoms/VerticalField";
import CButton from "../../../components/atoms/CButton";

import { MetaMaskIcon } from "../../../assets/icons";
import Icon from "../../../components/atoms/Icon/icon";

const AuthForm = ({
  onSubmit,
  onConnectWallet,
  formLabel=""
}: {
  onSubmit: (data: TUserForm) => void;
  onConnectWallet: () => void;
  formLabel?:string;
}) => {
  const { control, handleSubmit } = useForm<TUserForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = handleSubmit(onSubmit);

  return (
    <div className="p-8 w-96 bg-white rounded-lg mx-auto my-8">
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <VerticalField label="Email">
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => {
              return <CInput value={value} onChange={onChange} />;
            }}
          />
        </VerticalField>

        <VerticalField label="Password">
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => {
              return (
                <CInput value={value} onChange={onChange} type="password" />
              );
            }}
          />
        </VerticalField>
        <CButton label={formLabel} type="submit" />
      </form>
      <div className="mx-auto text-center mt-4">
        <p className="text-slate-800">Or {formLabel} with</p>
        <button onClick={onConnectWallet} className="p-0">
          <Icon
            image={MetaMaskIcon}
            size="small"
            variant="rounded"
            className="bg-slate-50 p-2"
          />
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
