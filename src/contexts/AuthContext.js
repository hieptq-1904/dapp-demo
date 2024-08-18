import {createContext, useEffect, useMemo, useState} from "react";
import {ethers} from "ethers";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [error, setError] = useState(null);
  const [myBalance, setMyBalance] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        const signer = provider.getSigner()
        if (accounts.length) {
          setProvider(provider);
          setAccount(accounts[0]);
          setSigner(signer);
        }
      }
    }
    checkConnection();
  }, []);

  const connectMetaMask = async () => {
    try {
      if (!window.ethereum) {
        return false
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      if (!accounts.length) {
        return false;
      }
      setProvider(provider);
      setAccount(accounts[0]);
      setSigner(signer);
      return true;
    } catch (e) {
      console.log(e)
    }
  }

  const contextValue = {
    provider,
    account,
    signer,
    error,
    connectMetaMask,
    myBalance
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
