import { useAssets, useWallet } from "@meshsdk/react";
import { CompileStatusEnum, useCompileCampaign } from "@jetplane/velocity-tools";
import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "../shared/Layout";
import Image from "next/image";
import { Assets } from "../wallet/Assets";
import { WaletAsset } from "../wallet/Asset";
import useAsset from "../hooks/useAsset";
import { Asset } from "@meshsdk/core";

enum Step {
    IMAGE,
    FRAME,
    PFP,
    CAPTION,
    REVIEW,
    MINTING,
    DONE,
}

const Home = () => {
    const { wallet, connected } = useWallet();
    const { campaignConfig, check, status, setUserDefinedInput } = useCompileCampaign();
    const assets = useAssets();
    const inputRef: any = useRef(null);
    const captionInputRef: any = useRef(null);
    const [imageInput, setImageInput] = useState<any>(null);
    const [frameInput, setFrameInput] = useState<any>(null);
    const [pfpInput, setPfpInput] = useState<any>(null);
    const [captionInput, setCaptionInput] = useState<any>(null);
    const [step, setStep] = useState(Step.CAPTION);
    const [frames, setFrames] = useState<any[]>([]);

    const [myAssets, setMyAssets] = useState<any>(null);
    const { fetchAsset } = useAsset();

    useEffect(() => {
        if (assets && !myAssets?.length) {
            Promise.all(assets.slice(0, 10).map((item: Asset) => fetchAsset(item))).then((data) => {
                setMyAssets(data);
            });
        }
    }, [assets, fetchAsset, myAssets?.length]);

    useEffect(() => {
        if (wallet && connected && status === CompileStatusEnum.INIT) {
            check();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet, connected]);

    useEffect(() => {
        if (campaignConfig) {
            const frameInput = campaignConfig?.inputs?.find((x: any) => x.id === "frames");
            if (frameInput) {
                setFrames(frameInput.options);
            }
        }
    }, [campaignConfig]);

    {
        if (step === Step.IMAGE)
            return (
                <Layout title="Upload an image">
                    <div className="grid grid-cols-12 gap-5 h-[600px]">
                        <div className="col-span-8">
                            <input ref={inputRef} className="file-input file-input-ghost w-full max-w-xs" type="file" accept="image/*" />
                            <button
                                onClick={() => {
                                    if (campaignConfig) {
                                        setUserDefinedInput("image", "postcard", {}, inputRef?.current?.files[0]).then((result) => {
                                            setImageInput(result);
                                            setStep(Step.FRAME);
                                        });
                                    }
                                }}
                                className="btn btn-primary mt-2"
                            >
                                Upload
                            </button>
                        </div>
                        <div className="col-span-4"></div>
                    </div>
                </Layout>
            );
    }

    {
        if (step === Step.FRAME)
            return (
                <Layout title="Select a frame">
                    <div className="grid grid-cols-12 gap-5 h-[600px]">
                        {frames.map((frame, index) => (
                            <div key={index} className="col-span-4">
                                <Image src={frame.image?.downloadURL} width={200} height={200} alt={frame.name} />
                                <button
                                    onClick={() => {
                                        setFrameInput(frame);
                                        setStep(Step.PFP);
                                    }}
                                    className="btn btn-primary mt-2"
                                >
                                    {frame.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </Layout>
            );
    }

    {
        if (step === Step.PFP)
            return (
                <Layout title="Select a PFP">
                    <div className="grid grid-cols-12 gap-5">
                        {(myAssets || []).map(({ onchain_metadata: item }: { onchain_metadata: any }, index: any) => (
                            <WaletAsset
                                item={item}
                                key={index}
                                action={{
                                    action: (item: any) => {
                                        setPfpInput(item);
                                        setStep(Step.CAPTION);
                                        return null;
                                    },
                                    status,
                                    label: () => "Select",
                                }}
                            />
                        ))}
                    </div>
                </Layout>
            );
    }

    {
        if (step === Step.CAPTION)
            return (
                <Layout title="Enter a caption">
                    <div className="grid grid-cols-12 gap-5 h-[600px]">
                        <div className="col-span-8">
                            <input ref={captionInputRef} className="textarea textarea-bordered" placeholder="Enter a Caption" type="textarea" />
                            <button
                                onClick={() => {
                                    if (campaignConfig) {
                                        setUserDefinedInput("caption", "postcard", captionInputRef?.current?.value).then((result) => {
                                            setCaptionInput(result);
                                            setStep(Step.REVIEW);
                                        });
                                    }
                                }}
                                className="btn btn-primary mt-2"
                            >
                                Review
                            </button>
                        </div>
                        <div className="col-span-4"></div>
                    </div>
                </Layout>
            );
    }

    {
        if (step === Step.REVIEW)
            return (
                <Layout title="Enter a caption">
                    <div className="grid grid-cols-12 gap-5 h-[600px]">
                        <div className="col-span-8">
                            {
                                // TODO: Compile preview from inputs
                            }
                            {
                                // TODO: Display mint quote
                            }
                            <button
                                onClick={() => {
                                    if (campaignConfig) {
                                        setUserDefinedInput("caption", "postcard", captionInputRef?.current?.value).then((result) => {
                                            setCaptionInput(result);
                                            setStep(Step.MINTING);
                                        });
                                    }
                                }}
                                className="btn btn-primary mt-2"
                            >
                                Mint
                            </button>
                        </div>
                        <div className="col-span-4"></div>
                    </div>
                </Layout>
            );
    }
};

export default Home;
