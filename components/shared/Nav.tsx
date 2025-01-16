import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "../../helpers/config";
import { BrowserWallet, Wallet } from "@meshsdk/core";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  selectedWallet,
  selectWallet,
} from "../../store/features/wallet/walletSlice";
import { useWallet } from "@meshsdk/react";
import Link from "next/link";
import { getPublicImageURL } from "../../utils/assets";

const Nav = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const connectedWallet = useAppSelector(selectedWallet);
  const { connected, connect, disconnect } = useWallet();
  const [connectedWalletData, setConnectedWalletData] = useState<
    Wallet | undefined
  >();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const wallets = BrowserWallet.getInstalledWallets();
    setWallets(wallets);
  }, []);

  useEffect(() => {
    if (!connected && connectedWallet) {
      connect(connectedWallet);
    }
    if (connected && !connectedWallet) {
      disconnect();
    }
    if (connected && connectedWallet && !connectedWalletData) {
      setConnectedWalletData(wallets.find((x) => x.name === connectedWallet));
    }
  }, [
    connect,
    connected,
    connectedWallet,
    disconnect,
    connectedWalletData,
    wallets,
  ]);

  const connectWallet = (walletName: string | null) => {
    const elem: any = document.activeElement;
    if (elem) {
      elem?.blur();
    }
    dispatch(selectWallet(walletName));
  };

  return (
    <nav>
      <div className="navbar ">
        <div className="flex-1">
          <Link
            className="normal-case text-xl w-[98px] h-[98px] rounded-xl overflow-hidden"
            href={"/"}
          >
            <Image
              src={getPublicImageURL("sm-logo.png")}
              width={98}
              height={98}
              alt={config.projectName}
              className="w-full h-full object-cover"
            />
            <h1 className="absolute h-0 w-0 indent-[99999px] overflow-hidden">
              {config.projectName}
            </h1>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="bg-transparent cursor-pointer avatar"
            >
              <div className="flex justify-center items-center ">
                {!connected || !connectedWallet || !connectedWalletData ? (
                  <FontAwesomeIcon icon={faWallet} style={{ fontSize: 20 }} />
                ) : (
                  <div className="w-8 h-8">
                    <Image
                      src={connectedWalletData.icon}
                      width={20}
                      height={20}
                      alt={connectedWalletData.name}
                    />
                  </div>
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary text-primary-content rounded-box w-40  space-y-2"
            >
              {!connected ? (
                wallets?.map((wallet) => {
                  return (
                    <li key={wallet.name} className="flex">
                      <button
                        onClick={() => {
                          return connectWallet(wallet.name);
                        }}
                        className="hover:text-primary-content"
                      >
                        <Image
                          className="w-5 h-5"
                          src={wallet.icon}
                          width={20}
                          height={20}
                          alt={wallet.name}
                        />
                        {wallet.name}
                      </button>
                    </li>
                  );
                })
              ) : (
                <li>
                  <a
                    onClick={() => connectWallet(null)}
                    className="hover:text-primary-content"
                  >
                    Disconnect
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export { Nav };
