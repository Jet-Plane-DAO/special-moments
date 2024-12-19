import React from "react";
import Carousel from "../../shared/Carousel/Carousel";
import { FrameSelectorTypes } from "./FrameSelectorTypes";
import Image from "next/image";

export default function FrameSelector({
  onSelect,
  frames,
}: FrameSelectorTypes) {
  return (
    <div>
      <div className="frame-carousel pb-10">
        <Carousel
          renderItem={(item) => {
            return (
              <div className="">
                <div className="relative pt-[100%]">
                  <Image
                    src={item.image?.downloadURL}
                    width="220"
                    height="220"
                    alt="frame"
                    className="absolute object-scale-down w-full h-full top-0"
                  />
                </div>
                <div
                  className={`flex justify-center items-center pb-4 border-0 bg-transparent absolute top-0 w-full h-full `}
                >
                  <button  onClick={() => onSelect(item)} className="btn px-8">Select</button>
                </div>
              </div>
            );
          }}
          slides={frames ?? []}
        />
      </div>
    </div>
  );
}
