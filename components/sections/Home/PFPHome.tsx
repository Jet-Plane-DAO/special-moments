import {
  Button,
  Carousel,
  FPFCard,
  SelectedMask,
} from "@app/components/shared";
import Layout from "@app/components/shared/Layout";
import { Grid } from "swiper/modules";
import "swiper/css/grid"; 
import { useState } from "react";

interface PFPHome {
  assets?: Array<any>;
  walletOnAction: (item: any) => void;
  status: any;
  walletAssetLabel?: string;
  headerCTA?: {
    label: string;
    action: () => void;
  };
}

export default function PFPHome({
  assets,
  headerCTA,
  walletOnAction,
}: PFPHome) {
  const [selected, setSelected] = useState<any>(null);
  return (
    <Layout
      title="Select a PFP"
      headerComponent={
        <Button
          onClick={() =>
            selected ? walletOnAction(selected) : headerCTA?.action()
          }
        >
          {selected ? "NEXT" : headerCTA?.label}
        </Button>
      }
    >
      <div className="mb-12">
        <Carousel
          navAddOnClassName="mt-5 lg:w-[98%] pl-[35px]"
          loop={false}
          modules={[Grid]}
          slides={assets ?? []}
          breakpoints={{
            [768]: {
              slidesPerView: (assets?.length ?? 0) < 8 ? assets?.length : 8,
            },
          }}
          renderItem={(asset, index) => {
            const { onchain_metadata: item, unit } = asset ?? {};
            return (
              <div className="flex justify-center" key={index}>
                <button
                  className="bg-transparent p-0 w-full block relative"
                  onClick={() => {
                    setSelected((_prev: any) => {
                      if (!_prev) {
                        return { ...item, unit };
                      }
                      if (_prev?.name === item.name) {
                        return null;
                      }
                      return { ...item, unit };
                    }); 
                  }}
                >
                  <FPFCard item={item} />
                  {selected?.name === item.name && <SelectedMask />}
                </button>
              </div>
            );
          }}
        />
      </div>
    </Layout>
  );
}
