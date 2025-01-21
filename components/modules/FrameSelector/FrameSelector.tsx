import React, { useCallback, useState } from "react";
import Carousel from "../../shared/Carousel/Carousel";
// import { FrameSelectorTypes } from "./FrameSelectorTypes";
import Image from "next/image";
import { SelectedMask } from "@app/components/shared";

interface FrameSelectorTypes {
  onSelect: (x: any) => void;
  frames?: Array<any>;
  frame?: any;
  className?: string;
}
export default function FrameSelector({
  onSelect,
  frames,
  className = "",
}: FrameSelectorTypes) {
  const [selected, setSelected] = useState<any>(null);
  
  const handleOnSelect = useCallback((item: any) => {
    setSelected((_prev: any) => {
      if (!_prev) {
        onSelect(item);
        return item;
      }
      if (_prev?.id === item.id) {
        onSelect(null);
        return null;
      }
      onSelect(item);
      return item;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className={["frame-carousel pb-10", className].join(" ")}>
        <Carousel
          renderItem={(item) => {
            return (
              <button
                onClick={() => handleOnSelect(item)}
                className="flex w-full h-full bg-transparent px-0 m-0 border-none"
              >
                <div className="relative frame-ratio w-full">
                  <Image
                    src={item.image?.downloadURL}
                    width="220"
                    height="220"
                    alt="frame"
                    className="absolute object-scale-down w-full h-full top-0 left-0"
                  />
                </div>
                {selected?.id === item.id && <SelectedMask />}
              </button>
            );
          }}
          slides={frames ?? []}
          slidesPerView={5}

          breakpoints={{
            [768]: {
              slidesPerView: 10
            }
          }}
        />
      </div>
    </div>
  );
}
