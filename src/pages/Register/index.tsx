import { ethers } from "ethers";
import { useRegister } from "../../apis/hooks/auth";
import AuthForm from "../Login/shared/AuthForm";
import { TUserForm } from "../Login/shared/schema";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../routes/routes";
import toast from "react-hot-toast";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/validateMessage";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../provider/authProvider";

const Register = () => {
  const { mutate: register } = useRegister();
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  const registerHandler = (data: TUserForm) => {
    register(data, {
      onSuccess: () => {
        toast.success("Register Successfully!");
        navigate(paths.login);
      },
      onError: (data) => {
        toast.error(data?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
      },
    });
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAccount = await signer.getAddress();
        registerHandler({
          metaMaskAddress: userAccount,
          email: "",
          password: "",
        });
      } catch (error) {
        toast.error("User denied account access or there was an error");
      }
    } else {
      toast.error("No Ethereum provider found. Please install MetaMask first.");
    }
  };

  useEffect(() => {
    if (role !== "guest") {
      navigate(paths.records);
    }
  }, [role]);

  return (
    <div className="bg-purple-02 h-[80vh] relative">
      <AuthForm
        onSubmit={registerHandler}
        onConnectWallet={connectWallet}
        formLabel={"Register"}
        subElement={
          <Link
            to={paths.login}
            className="text-blue-400 text-center w-full block underline"
          >
            Already have an account?
          </Link>
        }
      />
    </div>
  );
};

export default Register;
