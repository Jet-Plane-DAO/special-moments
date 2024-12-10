import { useAssets, useWallet } from "@meshsdk/react";
import { CompileStatusEnum, toPreDefinedUnit, toUserDefinedUnit, useCompileCampaign } from "@jetplane/velocity-tools";
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
    const { campaignConfig, check, quote, compile, status, setUserDefinedInput } = useCompileCampaign();
    const assets = useAssets();
    const inputRef: any = useRef(null);
    const captionInputRef: any = useRef(null);
    const [imageInput, setImageInput] = useState<any>(null);
    const [frameInput, setFrameInput] = useState<any>(null);
    const [pfpInput, setPfpInput] = useState<any>(null);
    const [captionInput, setCaptionInput] = useState<any>(null);
    const [step, setStep] = useState(Step.IMAGE);
    const [frames, setFrames] = useState<any[]>([]);
    const [quoteResponse, setQuoteResponse] = useState<any>(null);

    const [myAssets, setMyAssets] = useState<any>(null);
    const { fetchAsset } = useAsset();

    useEffect(() => {
        if (assets && !myAssets?.length) {
            Promise.all(
                assets.slice(0, 10).map((item: Asset) => {
                    return fetchAsset(item);
                })
            ).then((data) => {
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

    useEffect(() => {
        if (step === Step.REVIEW) {
            console.log(imageInput, frameInput, pfpInput, captionInput);
            quote("postcard", [toUserDefinedUnit(imageInput?.id, "image"), toUserDefinedUnit(captionInput?.id, "caption"), toPreDefinedUnit(frameInput?.id, "frames"), `${pfpInput?.unit}`], 1).then((result) => {
                console.log(result);
                setQuoteResponse(result);
            });
        }
    }, [step, imageInput, frameInput, pfpInput, captionInput]);

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
                        {(myAssets || []).map(({ onchain_metadata: item, unit }: { onchain_metadata: any; unit: string }, index: any) => (
                            <WaletAsset
                                item={item}
                                key={index}
                                action={{
                                    action: (item: any) => {
                                        setPfpInput({ ...item, unit });
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
                            {quoteResponse && (
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-8">
                                        {
                                            // TODO: Display preview image
                                        }
                                        <Image src={quoteResponse?.quote?.preview} width={400} height={400} alt="Preview" />
                                    </div>
                                    <div className="col-span-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <h2 className="card-title">Mint Quote</h2>
                                                <p>Price: {quoteResponse?.quote?.fee}A</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <button
                                onClick={() => {
                                    if (quoteResponse) {
                                        compile("postcard", [{ unit: toUserDefinedUnit(imageInput?.id, "image") }, { unit: toUserDefinedUnit(captionInput?.id, "caption") }, { unit: toPreDefinedUnit(frameInput?.id, "frames") }, pfpInput]);
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
