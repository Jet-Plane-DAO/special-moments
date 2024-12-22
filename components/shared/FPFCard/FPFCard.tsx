import Image from "next/image";
import { useMemo } from "react";

interface FPFCardProps {
  item?: any;
}

export default function FPFCard({ item }: FPFCardProps) {
    const itemImage = useMemo(() => {
            if(!item?.image){
                return ""
            }
            if(item?.image?.includes("ipfs://")){
                return item?.image.replace("ipfs://", "")
            }
            return item?.image
        }, [item])
  return (
    <>
      <div className="pfp-ratio hover:opacity-80 transition-opacity duration-500">
        <Image
          src={`https://ipfs.blockfrost.dev/ipfs/${itemImage}`}
          alt={item?.name ?? ""}
          width={120}
          height={120}
        />
      </div>
    </>
  );
}
