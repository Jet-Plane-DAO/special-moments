import { useWallet } from "@meshsdk/react";
import { CompileStatusEnum, useCompileCampaign } from "@jetplane/velocity-tools";
import { useCallback, useEffect, useRef } from "react";
import Layout from "../shared/Layout";

const Home = () => {
    const { wallet, connected } = useWallet();
    const { campaignConfig, check, status, setUserDefinedInput } = useCompileCampaign();
    const inputRef: any = useRef(null);

    useEffect(() => {
        if (wallet && connected && status === CompileStatusEnum.INIT) {
            check();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet, connected]);

    const upload = useCallback(() => {
        if (campaignConfig) {
            setUserDefinedInput("image", {}, inputRef?.current?.files[0]);
        }
    }, [campaignConfig, setUserDefinedInput]);

    return (
        <Layout title="Upload an image">
            <div className="grid grid-cols-12 gap-5 h-[600px]">
                <div className="col-span-8">
                    <input ref={inputRef} className="file-input file-input-ghost w-full max-w-xs" type="file" accept="image/*" />
                    <button onClick={upload} className="btn btn-primary mt-2">
                        Upload
                    </button>
                </div>
                <div className="col-span-4"></div>
            </div>
        </Layout>
    );
};

export default Home;
