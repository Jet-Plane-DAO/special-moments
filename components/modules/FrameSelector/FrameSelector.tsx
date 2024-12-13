import React from "react";
import Carousel from "../../shared/Carousel/Carousel";
import { FrameSelectorTypes } from "./FrameSelectorTypes";
import Image from "next/image";

export default function FrameSelector({
  onSelect,
  frames,
  frame,
}: FrameSelectorTypes) {
  return (
    <div>
      {/* <div>
        <>
          <div className="frame-aspect flex justify-center items-center">
            {!frame ? (
              <h2 className="absolute top-[50%] left-[50%]">FRAME PREVIEW</h2>
            ) : (
              <Image
                src={frame.image?.downloadURL}
                width="220"
                height="220"
                alt="Selected Frame"
              />
            )}
          </div>
        </>
      </div> */}
      <div className="frame-carousel pb-10">
        <Carousel
          renderItem={(item) => {
            
            return (
              <button
                className={`bg-transparent border-0 btn-card hover:opacity-80${item?.id === frame?.id ? ' frame-selected': ''}`}
                onClick={() => onSelect(item)}
              >
                <Image
                  src={item.image?.downloadURL}
                  width="220"
                  height="220"
                  alt="frame"
                />
              </button>
            );
          }}
          slides={frames ?? []}
        />
      </div>
    </div>
  );
}
