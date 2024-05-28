import { useContext, useState } from "react";
import CButton from "../../components/atoms/CButton";
import { IPlainObject } from "../../types/common";
import { ethers } from "ethers";
import { useCreateTransaction } from "../../apis/hooks/transaction";
import { AuthContext } from "../../provider/authProvider";
import Spin from "../../components/atoms/Spin";
import toast from "react-hot-toast";
import { OwwiLogo } from "../../assets/images";
import { DEFAULT_CHAIN_ID } from "../../constants/common";

const DashboardDefault = () => {
  const [disable, setDisable] = useState(false);
  const { updateMember } = useContext(AuthContext);
  const { mutate: createTransaction } = useCreateTransaction();

  const joinMemberHandler = async () => {
    if (window.ethereum) {
      try {
        setDisable(true);
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        if (chainId !== DEFAULT_CHAIN_ID) {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: DEFAULT_CHAIN_ID }],
          });
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAccount = await signer.getAddress();

        const transaction = await signer.sendTransaction({
          from: userAccount,
          to: "0x44ee0329BA58941D7B0A34f762de9077037d8A08",
          value: BigInt(1),
        });

        createTransaction(
          {
            transaction: JSON.stringify(transaction),
            metaMaskAddress: userAccount,
          },
          {
            onSuccess: (data) => {
              updateMember?.(data.content);
              setDisable(false);
              toast.success("Payment Successfully!");
            },
            onError: () => {
              toast.error("Error when create transaction!");
              setDisable(false);
            },
          }
        );
      } catch (error) {
        const errorCode = error as IPlainObject;
        if (errorCode.code === "ACTION_REJECTED") {
          toast.error("Canceled Transaction");
        } else if (errorCode.code === "INSUFFICIENT_FUNDS") {
          toast.error("Account do not has enough gas!");
        } else {
          toast.error("There was an error during transaction!");
        }
        setDisable(false);
      }
    } else {
      toast.error("No Ethereum provider found. Please install MetaMask first.");
    }
  };

  return (
    <div className="flex flex-col gap-4 text-center mt-10 mx-auto bg-white w-fit p-8 rounded-lg max-w-96 hover:shadow-lg">
      <p className="text-lg font-medium">Join Owwi Member</p>
      <p>To Unlock Dashboard once and for all</p>
      <img src={OwwiLogo} />
      <p className="text-lg">
        With only <strong>0.01 ETH</strong>
      </p>

      <CButton
        label="Join Now"
        className="w-36 self-center"
        onClick={joinMemberHandler}
        disabled={disable}
      />

      {disable && (
        <div className="flex flex-col gap-2 items-center text-center justify-center">
          <Spin />
          <span className="text-md">
            Please wait... It will take a minute...
          </span>
        </div>
      )}
    </div>
  );
};

export default DashboardDefault;
