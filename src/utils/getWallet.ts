import { ethers } from "ethers";
import { SIGN_MESSAGE } from "../constants/common";
import toast from "react-hot-toast";

export const getWallet = async (
  callback: (
    metaMaskAddress: string,
    signature: string,
    signer: ethers.JsonRpcSigner
  ) => void,
  requiredSignature: boolean,
  chainIdRequire?: string
) => {
  if (window.ethereum) {
    try {
      if (!!chainIdRequire && chainIdRequire !== "0xaa36a7") {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }],
        });
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      let signature = "";
      const userAccount = await signer.getAddress();
      if (requiredSignature) {
        signature = await signer.signMessage(SIGN_MESSAGE);
      }
      callback(userAccount, signature, signer);
    } catch (error) {
      toast.error("User denied account access or there was an error");
    }
  } else {
    toast.error("No Ethereum provider found. Please install MetaMask first.");
  }
};
