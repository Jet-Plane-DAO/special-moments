import { FrameSelector } from "@app/components/modules";
import { Button } from "@app/components/shared";
import Layout from "@app/components/shared/Layout";
import React from "react";

interface PostcardHome {
  postcardInput?: any;
  Step?: any;
  setStep: (x: any) => void;
  // setFrameInput: (x:any) => void;
  postcards?: Array<any>;
  onSelect: (x: any) => void;
}

export default function PostcardHome({
  postcardInput,
  Step,
  setStep,
  onSelect,
  postcards,
}: PostcardHome) {
  return (
    <Layout
      title="Select a postcard"
      headerComponent={
        <Button
          onClick={() =>
            !postcardInput ? setStep(Step.FRAME) : setStep(Step.PFP)
          }
        >
          {!postcardInput ? "BACK" : "NEXT"}
        </Button>
      }
    >
      <FrameSelector
        onSelect={onSelect}
        frame={postcardInput}
        frames={postcards}
      />
    </Layout>
  );
}
