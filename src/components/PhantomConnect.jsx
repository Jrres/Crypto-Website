// App.tsx
import { useWeb3React } from "@web3-react/core";
import { PhantomConnector } from "web3-react-v6-phantom";

const phantom = new PhantomConnector({
  supportedChainIds: [1, 5], // Mainnet and Goerli ChainIds
});

function Phantom() {
  const { activate, deactivate, account } = useWeb3React();
  const handleConnect = async () => {
    try {
      await activate(phantom);
    } catch (e) {
      console.error(e);
    }
  };
  const handleDisconnect = () => {
    try {
      deactivate();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div >
        
        <div className="wallet-connector cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300">
            <img src="img/Phantom_SVG_Icon.svg" onClick={handleConnect}></img>
          <p>{account ? account : "no account connected"}</p>
        </div>
      </div>
    </>
  );
}

export default Phantom;
