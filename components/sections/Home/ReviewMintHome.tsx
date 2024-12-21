import { ButtonHeader, ButtonHeaderProps } from "@app/components/shared";
import Layout from "@app/components/shared/Layout";
import Image from "next/image";

interface ReviewMintHomeProps {
  headerCTA?: ButtonHeaderProps;
  response?: any;
  onMint: (inputRef: any) => void;
}
export default function ReviewMintHome({
  headerCTA,
  response,
  onMint,
}: ReviewMintHomeProps) {
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
      <div className="grid grid-cols-12 gap-5 h-auto pb-12">
        <div className="col-span-8">
          {response && (
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-8">
                {
                  // TODO: Display preview image
                }
                <Image
                  src={response?.quote?.preview?.downloadURL}
                  width={400}
                  height={400}
                  alt="Preview"
                />
              </div>
              <div className="col-span-4">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Mint Quote</h2>
                    <p>Price: {response?.quote?.fee}A</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <button onClick={onMint} className="btn btn-primary mt-2">
            Mint
          </button>
        </div>
        <div className="col-span-4"></div>
      </div>
    </Layout>
  );
}
