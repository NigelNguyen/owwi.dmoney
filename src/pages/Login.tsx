// src/Login.tsx
import React, { useState } from "react";
import { ethers } from "ethers";
import { IPlainObject } from "../types/common";
import { MetaMaskIcon } from "../assets/icons";
import Icon from "../components/atoms/Icon";

const Login: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    const window_ = window as IPlainObject;
    if (window_.ethereum) {
      try {
        // Request account access if needed
        await window_.ethereum.request({
          method: "eth_requestAccounts",
        });
        // We use ethers.js to create a provider and get the accounts
        const provider = new ethers.BrowserProvider(window_.ethereum);
        const signer = await provider.getSigner();
        const userAccount = await signer.getAddress();
        const data = await provider.getBalance(userAccount);
        console.log({ data });
        const transaction = await signer.sendTransaction({
          from: userAccount,
          to: "0x44ee0329BA58941D7B0A34f762de9077037d8A08",
          value: BigInt(570000000000000),
        });
        console.log({ transaction: transaction });
        console.log({ data: { ...transaction } });
        setAccount(userAccount);

        // Optional: send the address to the backend
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

  const sendAddressToBackend = async (address: string) => {
    try {
      const response = await fetch("https://your-backend-api.com/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });
      const data = await response.json();
      console.log("Backend response:", data);
    } catch (error) {
      console.error("Error sending address to backend:", error);
    }
  };

  console.log({ account });

  return (
    <div>
      <p>Login with</p>
      {account ? (
        <div>
          <h2>Logged in as: {account}</h2>
        </div>
      ) : (
        <button onClick={connectWallet} className="p-0">
          <Icon
            image={MetaMaskIcon}
            size="small"
            variant="rounded"
            className="bg-slate-50 p-2"
          />
        </button>
      )}
    </div>
  );
};

export default Login;
