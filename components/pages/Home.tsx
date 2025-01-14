 import {   toPrecompileInputUnit, toPreDefinedUnit, toUserDefinedUnit, useCompileCampaign } from "@jetplane/velocity-tools";
import { useEffect, useMemo, useState } from "react";
import useAsset from "../hooks/useAsset";
import { AddCaptionHome, SectionChooseFrame, PFPHome, ReviewMintHome, UploadImageHome } from "../sections";
import PostcardHome from "../sections/Home/PostcardHome";
import useFrame from "../hooks/useFrame";
import usePostcard from "../hooks/usePostcard";
import useConnectedWallet from "../hooks/useConnectedWallet";
import LoadingFullLayout from "../shared/Loading/LoadingFullLayout"; 

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
    const { quote, compile, status, setUserDefinedInput } = useCompileCampaign();

    const [imageInput, setImageInput] = useState<any>(null);
    const [frameInput, setFrameInput] = useState<any>(null);
    const [postcardInput, setPostcardInput] = useState<any>(null);
    const [pfpInput, setPfpInput] = useState<any>(null);
    const [captionInput, setCaptionInput] = useState<any>(null);
    const [step, setStep] = useState(Step.PFP);
    const [quoteResponse, setQuoteResponse] = useState<any>(null);
    const [_, setPreviewImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [tempImageFile, setTempImageFile] = useState<any>(null);
    const [captionText, setCaptionText] = useState<any>("");
    const { myAssets } = useAsset(); 

    const { campaignConfig, connected, connecting } = useConnectedWallet()
    const { frames } = useFrame(campaignConfig)
    const { postcards } = usePostcard(campaignConfig)

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

    const isOnProcessing = useMemo(() => {

        if (connecting) {
            return true
        }

        if (!connected) {
            return true
        }

        if (!campaignConfig) {
            return true;
        }

        return false;
    },[campaignConfig, connected, connecting])

    // if (!connected && connecting) {
    //     return (
    //         <LoadingFullLayout />
    //     );
    // }

    // if (!connected && !connecting) {
    //     return (
    //         <LoadingFullLayout />
    //     );
    // }

    // if (!campaignConfig) {
    //     return (
    //         <LoadingFullLayout />
    //     );
    // }
    
    const setAssets = useMemo(()=> {
        if(myAssets){
            return myAssets
            // return Array(50).fill(myAssets).flat()
        }
        return myAssets
    }, [myAssets])

    if (isOnProcessing) {
        return (
            <LoadingFullLayout />
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
                assets={setAssets}
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