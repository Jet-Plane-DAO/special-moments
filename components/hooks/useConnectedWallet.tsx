import { CompileStatusEnum, useCompileCampaign } from '@jetplane/velocity-tools';
import { useWallet } from '@meshsdk/react';
import { useEffect } from 'react'

export default function useConnectedWallet() {
    const { wallet, connected, connecting } = useWallet();
    const { campaignConfig, check, status } = useCompileCampaign();

    useEffect(() => {
        if (wallet && connected && status === CompileStatusEnum.INIT) {
            wallet.getNetworkId().then((networkId: number) => {
                if (networkId !== parseInt(`${process.env.NEXT_PUBLIC_NETWORK}`)) {
                    alert("Please switch to a wallet on the correct network");
                }
            });
            check();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet, connected,]);

    return { wallet, connecting, connected, campaignConfig }
}
