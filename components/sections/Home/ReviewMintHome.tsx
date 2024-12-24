import { ButtonHeader, ButtonHeaderProps } from "@app/components/shared";
import Layout from "@app/components/shared/Layout";
import { LoadingState } from "@app/components/shared/LoadingState";
import { getPublicImageURL } from "@app/utils/assets";
import Image from "next/image";
import { useMemo } from "react";

interface ReviewMintHomeProps {
  headerCTA?: ButtonHeaderProps;
  response?: any;
  onMint: (inputRef: any) => void;
  tempImageFile?: any;
}
export default function ReviewMintHome({
  headerCTA,
  response,
  tempImageFile,
  onMint,
}: ReviewMintHomeProps) {
  const imageRaw = useMemo(() => {
    console.log(tempImageFile)
    if (tempImageFile) {
      return URL.createObjectURL(tempImageFile ?? "");
    }
    return getPublicImageURL("logo-black.jpg")
  }, [tempImageFile]);
  if (!response) {
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
                  src={imageRaw}
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
                  <p>Price: {response?.quote?.fee}A</p>
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
