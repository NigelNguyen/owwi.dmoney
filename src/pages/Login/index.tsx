// src/Login.tsx
import React, { useContext } from "react";
import { ethers } from "ethers";
import { IPlainObject } from "../../types/common";
import { useLogin } from "../../apis/hooks/auth";
import AuthForm from "./shared/AuthForm";
import { TUserForm } from "./shared/schema";
import { AuthContext } from "../../provider/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../routes/routes";
import toast from "react-hot-toast";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/validateMessage";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: loginNormal } = useLogin();
  const { login } = useContext(AuthContext);

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

  const sendAddressToBackend = async (address: string) => {
    handleLogin({
      email: "",
      password: "",
      metaMaskAddress: address,
    });
  };

  const connectWallet = async () => {
    const window_ = window as IPlainObject;
    if (window_.ethereum) {
      try {
        await window_.ethereum.request({
          method: "eth_requestAccounts",
        });

        const provider = new ethers.BrowserProvider(window_.ethereum);
        const signer = await provider.getSigner();
        const userAccount = await signer.getAddress();
        sendAddressToBackend(userAccount);
      } catch (error) {
        toast.error("User denied account access or there was an error");
      }
    } else {
      toast.error("No Ethereum provider found. Please install MetaMask first");
    }
  };

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
