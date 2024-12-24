import { BrowserWallet, Wallet } from "@meshsdk/core";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectedWallet, selectWallet } from "../../store/features/wallet/walletSlice";
import { useWallet } from "@meshsdk/react";
import Button from "./Button";

const ButtonConnect: React.FC = () => {
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const connectedWallet = useAppSelector(selectedWallet);
    const { connected, connect, disconnect, connecting } = useWallet();
    const [connectedWalletData, setConnectedWalletData] = useState<Wallet | undefined>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const wallets = BrowserWallet.getInstalledWallets();
        setWallets(wallets);
        // if (!connected && connectedWallet) {
        //     // connect(connectedWallet);
        // }
    }, []);

    useEffect(() => {
        if (connected && !connectedWallet) {
            disconnect();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connected, connecting, connectedWallet]);

    useEffect(() => {
        if (connected) {
            setConnectedWalletData(wallets.find((x) => x.name === connectedWallet));
        }
    }, [connectedWallet, connected, wallets]);

    const connectWallet = (walletName: string | null) => {
        const elem: any = document.activeElement;
        if (elem) {
            elem?.blur();
        }
        dispatch(selectWallet(walletName));
        connect(walletName!);
    };

    return (
        <div className="gap-2">
            <div className="dropdown dropdown-end w-full">
                {!connected || !connectedWallet || !connectedWalletData ? (
                    <Button className="w-full">Choose Wallet</Button>
                ) : (
                    <button className="btn btn-primary text-b">
                        <div className="w-8 h-8">
                            <Image src={connectedWalletData.icon} width={20} height={20} alt={connectedWalletData.name} />
                        </div>
                    </button>
                )}

                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary text-primary-content rounded-box w-40 space-y-2">
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
                                        <Image className="w-5 h-5" src={wallet.icon} width={20} height={20} alt={wallet.name} />
                                        {wallet.name}
                                    </button>
                                </li>
                            );
                        })
                    ) : (
                        <li>
                            <a onClick={() => connectWallet(null)}>Disconnect</a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};
export default ButtonConnect;
