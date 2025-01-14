import { LoadingState } from "../shared/LoadingState";
import ButtonConnect from "../shared/ButtonConnect";

import { useAssets, useWallet } from "@meshsdk/react";
import { CompileStatusEnum, toPrecompileInputUnit, toPreDefinedUnit, toUserDefinedUnit, useCompileCampaign } from "@jetplane/velocity-tools";
import { useEffect, useState } from "react";
import useAsset from "../hooks/useAsset";
import { Asset } from "@meshsdk/core";
import { AddCaptionHome, SectionChooseFrame, PFPHome, ReviewMintHome, UploadImageHome } from "../sections";
import PostcardHome from "../sections/Home/PostcardHome";
import Layout from "../shared/Layout";

enum Step {
    IMAGE,
    FRAME,
    POSTCARD,
    PFP,
    CAPTION,
    REVIEW,
    MINTING,
    DONE,
}

const Home = () => {
    const { wallet, connected, connecting } = useWallet();

    const { campaignConfig, check, quote, compile, status, setUserDefinedInput } = useCompileCampaign();
    const assets = useAssets();
    const [imageInput, setImageInput] = useState<any>(null);
    const [frameInput, setFrameInput] = useState<any>(null);
    const [postcardInput, setPostcardInput] = useState<any>(null);
    const [pfpInput, setPfpInput] = useState<any>(null);
    const [captionInput, setCaptionInput] = useState<any>(null);
    const [step, setStep] = useState(Step.FRAME);
    const [frames, setFrames] = useState<any[]>([]);
    const [postcards, setPostcards] = useState<any[]>([]);
    const [quoteResponse, setQuoteResponse] = useState<any>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [myAssets, setMyAssets] = useState<any>(null);
    const [tempImageFile, setTempImageFile] = useState<any>(null);
    const [captionText, setCaptionText] = useState<any>("");
    const { fetchAsset } = useAsset();

    useEffect(() => {
        if (assets) {
            Promise.all(
                assets.slice(0, 20).map((item: Asset) => {
                    return fetchAsset(item);
                })
            ).then((data) => {
                setMyAssets(data);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assets]);

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
    }, [wallet, connected]);

    useEffect(() => {
        if (campaignConfig) {
            const frameInput = campaignConfig?.inputs?.find((x: any) => x.id === "frames");
            if (frameInput) {
                setFrames(frameInput.options);
            }
            const postcardsInput = campaignConfig?.inputs?.find((x: any) => x.id === "postcards");
            if (postcardsInput) {
                setPostcards(postcardsInput.options);
            }
        }
    }, [campaignConfig]);

    useEffect(() => {
        if (step === Step.REVIEW) {
            quote("postcard", [toUserDefinedUnit(imageInput?.id, "image"),
            toUserDefinedUnit(captionInput?.id, "caption"), toPreDefinedUnit(frameInput?.id, "frames"), toPreDefinedUnit(postcardInput?.id, "postcards"), `${pfpInput?.unit}`], 1).then(
                (result) => {
                    setQuoteResponse(result);
                }
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step, frameInput, pfpInput, postcardInput]);

    useEffect(() => {
        if (quoteResponse?.quote?.preview) {
            setPreviewImage(quoteResponse?.quote?.preview?.path?.split("/")?.pop());
        }
    }, [quoteResponse]);

    if (!connected && connecting) {
        return (
            <div className="w-full h-screen bg-gray-10  bg-teds bg-bottom ">
                <Layout title="Connecting Wallet">
                    <div className="flex justify-center items-center">
                        <LoadingState />
                    </div>
                </Layout>
            </div>
        );
    }

    if (!connected && !connecting) {
        return (
            <div className="w-full h-screen bg-gray-10  bg-teds bg-bottom ">
                <Layout title="">
                    <div className="flex justify-center items-center">
                        <ButtonConnect />
                    </div>
                </Layout>
            </div>
        );
    }

    if (!campaignConfig) {
        return (
            <div className="w-full h-screen bg-gray-10  bg-teds bg-bottom ">
                <Layout title="Special Moments">
                    <div className="flex justify-center items-center">
                        <LoadingState />
                    </div>
                </Layout>
            </div>
        );
    }

    if (step === Step.FRAME) {
        return (
            <SectionChooseFrame
                onSelect={(val) => {
                    setFrameInput(val);
                    setStep(Step.IMAGE);
                }}
                frameInput={frameInput}
                frames={frames}
            />
        );
    }

    if (step === Step.IMAGE) {
        return (
            <UploadImageHome
                setUserDefinedInput={(file) => {
                    setUploading(true)
                    if (campaignConfig) {
                        const tempImage = file;
                        setTempImageFile(tempImage);
                        setUploading(true);
                        setUserDefinedInput("image", "postcard", {}, tempImage)
                            .then((result) => {
                                setImageInput(result);
                                setStep(Step.POSTCARD);
                            })
                            .finally(() => {
                                setUploading(false);
                            });
                    }
                }}
                loading={uploading}
                headerCTA={{
                    label: "BACK",
                    action: () => setStep(Step.FRAME),
                }}
            />
        );
    }

    if (step === Step.POSTCARD) {
        return (
            <PostcardHome
                onSelect={(val) => {
                    setPostcardInput(val);
                    setStep(Step.PFP);
                }}
                headerCTA={{
                    label: "BACK",
                    action: () => setStep(Step.IMAGE),
                }}
                postcardInput={postcardInput}
                postcards={postcards}
            />
        );
    }

    if (step === Step.PFP) {
        return (
            <PFPHome
                status={status}
                walletAssetLabel="Select"
                walletOnAction={(item) => {
                    setPfpInput(item);
                    setStep(Step.CAPTION);
                }}
                headerCTA={{
                    label: "BACK",
                    action: () => setStep(Step.IMAGE),
                }}
                assets={myAssets}
            />
        );
    }

    // TODO: VEL-9 SHOULD SKIP THIS
    if (step === Step.CAPTION) {
        return (
            <AddCaptionHome
                headerCTA={{
                    label: "BACK",
                    action: () => setStep(Step.PFP),
                }}
                onSelect={(captionInputRef) => {
                    setCaptionText(captionInputRef?.current?.value);
                    // setStep(Step.REVIEW);
                    if (campaignConfig) {
                        setUserDefinedInput("caption", "postcard", captionInputRef?.current?.value).then((result) => {
                            setCaptionInput(result);
                            setStep(Step.REVIEW);
                        });
                    }
                }}
            />
        );
    }

    if (step === Step.REVIEW) {
        return (
            <ReviewMintHome
                headerCTA={{
                    label: "Cancel",
                    action: () => setStep(Step.FRAME),
                }}
                quote={quoteResponse}
                previewImageFile={tempImageFile}
                previewCaption={captionText}
                previewPostcard={postcardInput}
                previewFrame={frameInput}
                onMint={async () => {
                    // try {
                    //   setUploading(true);
                    //   const res = await setUserDefinedInput(
                    //     "image",
                    //     "postcard",
                    //     {},
                    //     tempImageFile
                    //   );

                    //   const caption = await setUserDefinedInput(
                    //     "caption",
                    //     "postcard",
                    //     captionText
                    //   );

                    //   compile("postcard", [
                    //     { unit: toUserDefinedUnit(res?.id, "image") },
                    //     { unit: toUserDefinedUnit(caption?.id, "caption") },
                    //     { unit: toPreDefinedUnit(frameInput?.id, "frames") },
                    //     { unit: toPreDefinedUnit(postcardInput?.id, "postcards") },
                    //     pfpInput,
                    //     toPrecompileInputUnit(campaignConfig.id, tempImageFile?.name),
                    //   ]);
                    // } catch (error) {
                    //   console.error(error);
                    //   setUploading(false);
                    // } finally {
                    //   setUploading(false);
                    // }
                    if (quoteResponse) {
                        console.log([
                            { unit: toUserDefinedUnit(imageInput.id, "image") },
                            { unit: toUserDefinedUnit(captionInput?.id, "caption") },
                            { unit: toPreDefinedUnit(frameInput?.id, "frames") },
                            {
                                unit: toPreDefinedUnit(postcardInput?.id, "postcards"),
                            },
                            pfpInput,
                            {
                                unit: toPrecompileInputUnit(campaignConfig.id, quoteResponse?.quote?.preview?.path.split("/").pop() ?? ""),
                            },
                        ]);
                        // setUserDefinedInput("image", "postcard", {}, tempImageFile)
                        //   .then((result) => {
                        compile("postcard", [
                            { unit: toUserDefinedUnit(imageInput.id, "image") },
                            { unit: toUserDefinedUnit(captionInput?.id, "caption") },
                            { unit: toPreDefinedUnit(frameInput?.id, "frames") },
                            {
                                unit: toPreDefinedUnit(postcardInput?.id, "postcards"),
                            },
                            pfpInput,
                            {
                                unit: toPrecompileInputUnit(campaignConfig.id, quoteResponse?.quote?.preview?.path.split("/").pop() ?? ""),
                            },
                        ]);
                        // })
                        // .finally(() => {
                        //   setUploading(false);
                        // });
                    }
                }}
            />
        );
    }
};
export default Home;

// export async function getStaticProps() {
//   /* Fetch data here */
//   const requestHeaders: HeadersInit = new Headers();

//   requestHeaders.set(
//     "jetplane-api-key",
//     process.env.NEXT_PUBLIC_VELOCITY_API_KEY ?? ""
//   );
//   const res = await fetch(`${process.env.NEXT_PUBLIC_VELOCITY_API}/summary`, {
//     method: "GET",
//     headers: requestHeaders,
//   });
//   const summary = await res.json();

//   return {
//     props: {
//       summary,
//     },
//     revalidate: 5 * 60,
//   };
// }
