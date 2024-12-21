import Layout from "../shared/Layout";
import { LoadingState } from "../shared/LoadingState";
import ButtonConnect from "../shared/ButtonConnect";

import { useAssets, useWallet } from "@meshsdk/react";
import {
  CompileStatusEnum,
  toPrecompileInputUnit,
  toPreDefinedUnit,
  toUserDefinedUnit,
  useCompileCampaign,
} from "@jetplane/velocity-tools";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useAsset from "../hooks/useAsset";
import { Asset } from "@meshsdk/core";
import {
  AddCaptionHome,
  FrameHome,
  PFPHome,
  ReviewMintHome,
  UploadImageHome,
} from "../sections";
import PostcardHome from "../sections/Home/PostcardHome";
import { ButtonHeader } from "../shared";

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
  const { campaignConfig, check, quote, compile, status, setUserDefinedInput } =
    useCompileCampaign();
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
      const frameInput = campaignConfig?.inputs?.find(
        (x: any) => x.id === "frames"
      );
      if (frameInput) {
        setFrames(frameInput.options);
      }
      const postcardsInput = campaignConfig?.inputs?.find(
        (x: any) => x.id === "postcards"
      );
      if (postcardsInput) {
        setPostcards(postcardsInput.options);
      }
    }
  }, [campaignConfig]);

  useEffect(() => {
    if (step === Step.REVIEW) {
      //   console.log(imageInput, frameInput, pfpInput, captionInput);
      quote(
        "postcard",
        [
          toUserDefinedUnit(imageInput?.id, "image"),
          //   toUserDefinedUnit(captionInput?.id, "caption"),
          toPreDefinedUnit(frameInput?.id, "frames"),
          toPreDefinedUnit(postcardInput?.id, "postcards"),
          `${pfpInput?.unit}`,
        ],
        1
      ).then((result) => {
        console.log(result);
        setQuoteResponse(result);
      });
    }
  }, [step, imageInput, frameInput, pfpInput, captionInput, postcardInput]);

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
      <FrameHome
        onSelect={(val) => {
          setFrameInput(val);
          setStep(Step.IMAGE);
        }}
        setStep={setStep}
        Step={Step}
        frameInput={frameInput}
        frames={frames}
      />
    );
  }

  if (step === Step.IMAGE) {
    return (
      <UploadImageHome
        setUserDefinedInput={(inputRef) => {
          if (campaignConfig) {
            setUserDefinedInput(
              "image",
              "postcard",
              {},
              inputRef?.current?.files[0]
            ).then((result) => {
              setImageInput(result);
              setStep(Step.POSTCARD);
            });
          }
        }}
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
          if (campaignConfig) {
            setUserDefinedInput(
              "caption",
              "postcard",
              captionInputRef?.current?.value
            ).then((result) => {
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
        response={quoteResponse}
        onMint={() => {
          if (quoteResponse) {
            compile("postcard", [
              { unit: toUserDefinedUnit(imageInput?.id, "image") },
              // { unit: toUserDefinedUnit(captionInput?.id, "caption") },
              { unit: toPreDefinedUnit(frameInput?.id, "frames") },
              { unit: toPreDefinedUnit(postcardInput?.id, "postcards") },
              pfpInput,
              toPrecompileInputUnit(campaignConfig.id, previewImage ?? ""),
            ]);
          }
        }}
      />
    );
  }
};
export default Home;

export async function getStaticProps() {
  /* Fetch data here */
  const requestHeaders: HeadersInit = new Headers();

  requestHeaders.set(
    "jetplane-api-key",
    process.env.NEXT_PUBLIC_VELOCITY_API_KEY ?? ""
  );
  const res = await fetch(`${process.env.NEXT_PUBLIC_VELOCITY_API}/summary`, {
    method: "GET",
    headers: requestHeaders,
  });
  const summary = await res.json();

  return {
    props: {
      summary,
    },
    revalidate: 5 * 60,
  };
}
