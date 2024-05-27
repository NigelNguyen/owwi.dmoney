import { Controller, useForm } from "react-hook-form";
import { TUserForm, userSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CInput from "../../../components/atoms/Input";
import VerticalField from "../../../components/atoms/VerticalField";
import CButton from "../../../components/atoms/CButton";

import { MetaMaskIcon } from "../../../assets/icons";
import Icon from "../../../components/atoms/Icon/icon";
import { paths } from "../../../routes/routes";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";

const AuthForm = ({
  onSubmit,
  onConnectWallet,
  formLabel = "",
  subElement,
}: {
  onSubmit: (data: TUserForm) => void;
  onConnectWallet: () => void;
  formLabel?: string;
  subElement?: React.ReactNode;
}) => {
  const { control, handleSubmit } = useForm<TUserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = handleSubmit(onSubmit);

  return (
    <div className="p-8 w-96 bg-white rounded-lg absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 shadow-lg">
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <Link to={paths.home} className="text-black flex gap-1 items-center">
          <FaAngleLeft /> Home
        </Link>
        <VerticalField label="Email">
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange }, fieldState: { error } }) => {
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

        <VerticalField label="Password">
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <CInput
                  value={value}
                  onChange={onChange}
                  type="password"
                  errorMessage={error?.message}
                />
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
      {subElement}
    </div>
  );
};

export default AuthForm;
