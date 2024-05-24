import { ethers } from "ethers";
import { useRegister } from "../../apis/hooks/auth";
import { IPlainObject } from "../../types/common";
import AuthForm from "../Login/shared/AuthForm";
import { TUserForm } from "../Login/shared/schema";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/routes";

const Register = () => {
  const { mutate: register } = useRegister();
  const navigate = useNavigate();

  const registerHandler = (data: TUserForm) => {
    register(data, {
      onSuccess: (data) => {
        console.log({ success: data });
        navigate(paths.login);
      },
      onError: (data) => {
        console.log({ error: data.message });
      },
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
        registerHandler({
          metaMaskAddress: userAccount,
          email: "",
          password: "",
        });
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
      onSubmit={registerHandler}
      onConnectWallet={connectWallet}
      formLabel={"Register"}
    />
  );
};

export default Register;
