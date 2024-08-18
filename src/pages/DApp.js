import {ConnectWallet} from "../components/ConnectWallet/ConnectWallet";
import {useContext, useEffect} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {Home} from "../components/Home";

export const DApp = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {

  }, []);

  return (
    <div>
      {authContext.account ?
        <Home />
        :
        <ConnectWallet></ConnectWallet>
      }
    </div>
  );
}
