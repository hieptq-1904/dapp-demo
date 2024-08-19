import {createContext, useEffect, useMemo, useState} from "react";
import {ethers} from "ethers";

export const AuthContext = createContext(null);

const networkParams = {
  chainId: '0x7A69',
  chainName: 'Localhost',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: ['http://127.0.0.1:8545/'],
  blockExplorerUrls: null,
};

const SMART_CONTRACT_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_member",
        "type": "address"
      }
    ],
    "name": "deactiveMember",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getListMember",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "addr",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "age",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          }
        ],
        "internalType": "struct EtherTransfer.Member[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      }
    ],
    "name": "joinGroup",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_member",
        "type": "address"
      }
    ],
    "name": "transferEther",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

export const AuthContextProvider = ({children}) => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [error, setError] = useState(null);
  const [myBalance, setMyBalance] = useState(null);
  const [contract, setContract] = useState(null);

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

  const switchNetwork = async () => {
    try {
      // Request to switch to the network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: networkParams.chainId}]
      });
      console.log('Network switched successfully');
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          // Add the network if it doesn't exist in MetaMask
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [networkParams]
          });
          console.log('Network added and switched successfully');
        } catch (addError) {
          console.error('Failed to add the network:', addError);
        }
      } else {
        console.error('Failed to switch the network:', switchError);
      }
    }
  }

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

  useEffect(() => {
    if (provider) {

      switchNetwork().then(() => {
        const daiContract = new ethers.Contract(SMART_CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        daiContract.getListMember().then(() => console.log('oke'))
      });
    }
  }, [provider]);

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
