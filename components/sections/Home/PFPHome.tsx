import { Carousel } from "@app/components/shared";
import Layout from "@app/components/shared/Layout";
import { WaletAsset } from "@app/components/wallet/Asset";
import React from "react";

interface PFPHome {
  assets?: Array<any>;
  walletOnAction: (item: any) => void;
  status: any;
  walletAssetLabel?: string;
}

export default function PFPHome({
  assets,
  walletOnAction,
  status,
  walletAssetLabel,
}: PFPHome) {
  return (
    <Layout title="Select a PFP">
      <div className="mb-12">
        <Carousel
          navAddOnClassName="mt-5 lg:w-[98%] pl-[35px]"
          slides={assets ?? []}
          renderItem={(asset, index) => {
            const { onchain_metadata: item, unit } = asset ?? {};
            return (
              <div className="flex justify-center">
                <WaletAsset
                  item={item}
                  key={index}
                  action={{
                    action: (item: any) => {
                      walletOnAction({ ...item, unit });
                      return null;
                    },
                    status,
                    label: () => walletAssetLabel ?? "Select",
                  }}
                />
              </div>
            );
          }}
        />
      </div>
    </Layout>
  );
}
