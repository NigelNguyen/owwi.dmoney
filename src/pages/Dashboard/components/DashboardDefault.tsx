import { useContext, useState } from "react";
import CButton from "../../../components/atoms/CButton";
import { IPlainObject } from "../../../types/common";
import { ethers } from "ethers";
import { useCreateTransaction } from "../../../apis/hooks/transaction";
import { AuthContext } from "../../../provider/authProvider";
import Spin from "../../../components/atoms/Spin";

const DashboardDefault = () => {
  const [disable, setDisable] = useState(false);
  const { updateMember } = useContext(AuthContext);
  const { mutate: createTransaction } = useCreateTransaction();

  const joinMemberHandler = async () => {
    const window_ = window as IPlainObject;
    if (window_.ethereum) {
      try {
        setDisable(true);
        await window_.ethereum.request({
          method: "eth_requestAccounts",
        });

        const provider = new ethers.BrowserProvider(window_.ethereum);
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
          },
          {
            onSuccess: (data) => {
              updateMember?.(data.content);
              setDisable(false);
            },
            onError: () => {
              console.log("Error when create transaction!");
              setDisable(false);
            },
          }
        );
      } catch (error) {
        const errorCode = error as IPlainObject;
        if (errorCode.code === "ACTION_REJECTED") {
          console.error("Cancel Transaction");
        } else {
          console.error({ error });
        }
      }
    } else {
      console.error("No Ethereum provider found. Install MetaMask.");
    }
  };

  return (
    <div className="flex flex-col gap-4 text-center mt-10">
      <p>Join Owwi Member to Unlock Dashboard once and for all</p>
      <p>With only 0.00000000000000001 ETH</p>

      <CButton
        label="Join Now"
        className="w-36 self-center"
        onClick={joinMemberHandler}
        disabled={disable}
      />

      {disable && (
        <div className="flex gap-2 items-center text-center justify-center">
          <Spin />
          <span className="text-xl">
            Please wait... It will take a minute...
          </span>
        </div>
      )}
    </div>
  );
};

export default DashboardDefault;
