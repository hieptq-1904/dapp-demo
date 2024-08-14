import {ConnectWallet} from "../components/ConnectWallet/ConnectWallet";
import {useContext, useEffect} from "react";
import {AuthContext} from "../contexts/AuthContext";

export const DApp = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {

  }, []);

  return (
    <div>
      {authContext.account ?
        <div>Me cha may</div>
        :
        <ConnectWallet></ConnectWallet>
      }
    </div>
  );
}
