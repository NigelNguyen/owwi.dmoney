// src/Login.tsx
import React, { useContext } from "react";
import { ethers } from "ethers";
import { IPlainObject } from "../../types/common";
import { useLogin } from "../../apis/hooks/auth";
import AuthForm from "./shared/AuthForm";
import { TUserForm } from "./shared/schema";
import { AuthContext } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/routes";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: loginNormal } = useLogin();
  const {login} = useContext(AuthContext);
  
  const handleLogin = (data: TUserForm) => {
    loginNormal(data, {
      onSuccess: (data) => {
        login?.(data.content);
        navigate(paths.home)
      },
      onError: (data) => {
        console.log({ error: data.message });
      },
    });
  };

  const sendAddressToBackend = async (address: string) => {
    handleLogin({
      email: '',
      password: '',
      metaMaskAddress: address
    })
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
        // const data = await provider.getBalance(userAccount);
        // const transaction = await signer.sendTransaction({
        //   from: userAccount,
        //   to: "0x44ee0329BA58941D7B0A34f762de9077037d8A08",
        //   value: BigInt(570000000000000),
        // });
        sendAddressToBackend(userAccount);
      } catch (error) {
        console.error(
          "User denied account access or there was an error",
          error
        );
      }
    } else {
      console.error("No Ethereum provider found. Install MetaMask.");
    }
  };

  return (
    <AuthForm
      onSubmit={handleLogin}
      onConnectWallet={connectWallet}
      formLabel={"Login"}
    />
  );
};

export default Login;
