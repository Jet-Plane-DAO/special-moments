import Image from "next/image";
import { useMemo } from "react";

interface FPFCardProps {
  item?: any;
}

export default function FPFCard({ item }: FPFCardProps) {
  const itemImage = useMemo(() => {
    if (!item?.image) {
      return ""
    }
    if (item?.image?.includes("ipfs://") && item?.image?.replace) {
      return item?.image?.replace("ipfs://", "")
    }
    return item?.image
  }, [item])

  return (
    <>
      <div className="pfp-ratio hover:opacity-80 transition-opacity duration-500">
        <Image
          src={`https://ipfs.blockfrost.dev/ipfs/${itemImage}`}
          alt={item?.name ?? ""}
          width={400}
          height={400}
        />
      </div>
    </>
  );
}
