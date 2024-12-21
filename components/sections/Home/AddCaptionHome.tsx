import { ButtonHeader, ButtonHeaderProps } from "@app/components/shared";
import Layout from "@app/components/shared/Layout";
import React, { useRef } from "react";

interface AddCaptionHomeProps {
  headerCTA?: ButtonHeaderProps;
  onSelect: (inputRef:any) => void
}

export default function AddCaptionHome({ headerCTA, onSelect }: AddCaptionHomeProps) {
  const captionInputRef: any = useRef(null);

  return (
    <Layout
      title="Enter a caption"
      headerComponent={
        headerCTA && (
          <ButtonHeader
            action={headerCTA?.action}
            label={headerCTA?.label ?? "Back"}
          />
        )
      }
    >
      <div className="flex justify-center pb-[180px]">
        <div className="grow-0 shrink-0 basis-[60%] min-w-[300px] flex flex-col items-center">
          <textarea
            ref={captionInputRef}
            className="textarea textarea-bordered h-[265px] w-full bg-primary text-primary-content"
            placeholder="Enter a Caption"
            
          />
          <button
            onClick={() => {
                onSelect(captionInputRef)
            }}
            className="btn btn-primary mt-8 flex"
          >
            Review
          </button>
        </div> 
      </div>
    </Layout>
  );
}
