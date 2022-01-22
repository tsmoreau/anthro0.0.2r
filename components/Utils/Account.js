import MetaMaskOnboarding from "@metamask/onboarding";
import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { injected } from "../../connectors";
import useENSName from "../../hooks/useENSName";
import { formatEtherscanLink, shortenHex } from "../../util";

const Account = ({ triedToEagerConnect }) => {
  const {
    active,
    error,
    activate,
    chainId,
    account,
    setError,
    deactivate
  } = useWeb3React();

  // initialize metamask onboarding
  const onboarding = useRef();

  useEffect(() => {
    onboarding.current = new MetaMaskOnboarding();
  }, []);

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      onboarding.current?.stopOnboarding();
    }
  }, [active, error]);

  const ENSName = useENSName(account);

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== "string") {
    const hasMetaMaskOrWeb3Available =
      MetaMaskOnboarding.isMetaMaskInstalled() ||
      window?.ethereum ||
      window?.web3;

    return (
      <div>
        {hasMetaMaskOrWeb3Available ? (
          <button
            className="font-futura text-xl text-white px-5 py-0.5 pt-0.5 font-light border-2 bg-th-primary-medium border-th-accent-light hover:bg-th-primary-medium"
            onClick={() => {
              setConnecting(true);

              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {MetaMaskOnboarding.isMetaMaskInstalled()
              ? "CONNECT WALLET"
              : "CONNECT WALLET"}
          </button>
        ) : (
          <button
            className="text-th-primary-dark font-futura text-xl"
            onClick={() => onboarding.current?.startOnboarding()}
          >
            Install Metamask
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="font-thin flex tracking-wide  font-futura text-xl text-white px-5 py-0.5 pt-0.5 border-2 bg-th-accent-light border-th-accent-light hover:bg-th-primary-medium">
      {ENSName || `${shortenHex(account, 4)}`} |{" "}
      <svg
        width="12"
        height="12"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 24 24"
        className="-mr-2 ml-1 text-th-primary-dark mt-2"
        stroke="white"
      >
        <path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z" />
      </svg>
    </div>
  );
};

export default Account;
