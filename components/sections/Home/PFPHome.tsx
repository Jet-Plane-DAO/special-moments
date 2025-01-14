import {
  Button,
  FPFCard,
  SelectedMask,
} from "@app/components/shared";
import Layout from "@app/components/shared/Layout";
import "swiper/css/grid";
import { useMemo, useState } from "react";
import { Chevron } from "@app/components/icons";

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

const pageSize: number = 24;

function paginate(array: any, page_number: number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * pageSize, page_number * pageSize);
}

export default function PFPHome({
  assets,
  headerCTA,
  walletOnAction,
}: PFPHome) {
  const [selected, setSelected] = useState<any>(null);
  const [page, setPage] = useState(1)
  const pageTotal = useMemo(() => {
    if (assets) {
      return Math.ceil(assets.length / pageSize);
    }
    return 1
  }, [assets])

  const listedPage = useMemo(() => {
    if (assets) {
      return paginate(assets, page)
    }
    return [];
  }, [page, assets])

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
      <div className="mb-12 md:columns-6 sm:columns-4 columns-3 gap-2">
        {listedPage?.map((asset: any, index: number) => {
          const { onchain_metadata: item, unit } = asset ?? {};
          return (
            <div className="flex justify-center mb-2" key={index}>
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
                {selected?.name === item?.name && <SelectedMask />}
              </button>
            </div>
          );
        })}
      </div>
      <div className="pb-12 flex justify-center">

        <Button variant="transparent-xs" className="rotate-180"><Chevron /></Button>
        {Array(pageTotal).fill('').map((a, i) => {
          return (
            <Button variant="transparent-xs" className={`${i + 1 === page ? "underline" : ""} font-normal`} key={i} onClick={() => setPage(i + 1)}>{i + 1}</Button>
          )
        })}
        <Button variant="transparent-xs"><Chevron /></Button>
      </div>

    </Layout>
  );
}
