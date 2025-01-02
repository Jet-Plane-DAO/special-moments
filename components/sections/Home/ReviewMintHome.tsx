import { ButtonHeader, ButtonHeaderProps } from "@app/components/shared";
import Layout from "@app/components/shared/Layout";
import { LoadingState } from "@app/components/shared/LoadingState";
import { getPublicImageURL } from "@app/utils/assets";
import Image from "next/image";
import { useEffect, useMemo } from "react";

interface ReviewMintHomeProps {
  headerCTA?: ButtonHeaderProps;
  quote?: any;
  onMint: (inputRef: any) => void;
  previewImageFile?: any;
  previewFrame?: any;
  previewPostcard?: any;
  previewCaption?: any;
}
export default function ReviewMintHome({
  headerCTA,
  quote,
  previewImageFile,
  onMint,
  previewCaption,
  previewFrame,
  previewPostcard,
}: ReviewMintHomeProps) {
  const previewImageURL = useMemo(() => {
    if (previewImageFile) {
      return URL.createObjectURL(previewImageFile ?? "");
    }
    return getPublicImageURL("logo-black.jpg");
  }, [previewImageFile]);

  useEffect(() => {
    console.log("Previev Caption:", previewCaption);
    console.log("Previev Frame:", previewFrame);
    console.log("Previev postcard:", previewPostcard);
  }, [previewCaption, previewFrame, previewPostcard]);
  if (!quote) {
    <Layout
      title="Preview"
      headerComponent={
        headerCTA && (
          <ButtonHeader
            action={headerCTA?.action}
            label={headerCTA?.label ?? "Back"}
          />
        )
      }
    >
      <LoadingState />
    </Layout>;
  }
  return (
    <Layout
      title="Preview"
      headerComponent={
        headerCTA && (
          <ButtonHeader
            action={headerCTA?.action}
            label={headerCTA?.label ?? "Back"}
          />
        )
      }
    >
      <div className="flex justify-center items-center flex-col pb-[126px]">
        {/* {response && ( */}
        <>
          <div className="flex mb-8">
            <div className="flex justify-center flex-col items-center">
              <div className="review-ratio">
                <Image
                  src={quote?.quote?.preview?.downloadURL}
                  // src={"/assets/images/fpo/bg.jpg"}
                  width={400}
                  height={400}
                  alt="Preview"
                />
                <div className="flex justify-center mt-8">
                  <button onClick={onMint} className="btn btn-primary">
                    Mint
                  </button>
                </div>
              </div>
            </div>
            <div className="">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Mint Quote</h2>
                  <p>Price: {quote?.quote?.fee}A</p>
                </div>
              </div>
            </div>
          </div>
        </>
        {/* )} */}
      </div>
    </Layout>
  );
}
