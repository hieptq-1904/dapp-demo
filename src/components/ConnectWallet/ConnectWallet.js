import {Button} from "antd";
import {WalletOutlined, WarningOutlined} from "@ant-design/icons";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";

export const ConnectWallet = () => {
  const authContext = useContext(AuthContext);

  const isInstallMetaMask = () => {
    return window.ethereum;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        {!isInstallMetaMask() ?
          <div>
            <WarningOutlined /> Please install MetaMask Extension to use this app
          </div>
          :
          <Button type="primary" shape="round" icon={<WalletOutlined/>} size="large" onClick={authContext.connectMetaMask}>
            Connect Wallet
          </Button>
        }
      </div>
    </div>
  );
}