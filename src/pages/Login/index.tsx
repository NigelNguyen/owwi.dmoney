// src/Login.tsx
import React, { useContext, useEffect } from "react";
import { useLogin } from "../../apis/hooks/auth";
import AuthForm from "./shared/AuthForm";
import { TUserForm } from "./shared/schema";
import { AuthContext } from "../../provider/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../routes/routes";
import toast from "react-hot-toast";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/validateMessage";
import { getWallet } from "../../utils/getWallet";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: loginNormal } = useLogin();
  const { login, role } = useContext(AuthContext);

  const handleLogin = (data: TUserForm) => {
    loginNormal(data, {
      onSuccess: (data) => {
        toast.success("Login successfully!");
        login?.(data.content);
        navigate(paths.records);
      },
      onError: (data) => {
        toast.error(data?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
      },
    });
  };

  const sendAddressToBackend = async (address: string, signature: string) => {
    handleLogin({
      email: "",
      password: "",
      metaMaskAddress: address,
      signature,
    });
  };

  const connectWallet = async () => {
    getWallet((userAccount, signature) => {
      sendAddressToBackend(userAccount, signature);
    }, true);
  };

  useEffect(() => {
    if (role !== "guest") {
      navigate(paths.records);
    }
  }, [role]);

  return (
    <div className="bg-purple-02 h-[80vh] relative">
      <AuthForm
        onSubmit={handleLogin}
        onConnectWallet={connectWallet}
        formLabel={"Login"}
        subElement={
          <Link
            to={paths.register}
            className="text-blue-400 text-center w-full block underline"
          >
            Do not have an account?
          </Link>
        }
      />
    </div>
  );
};

export default Login;
