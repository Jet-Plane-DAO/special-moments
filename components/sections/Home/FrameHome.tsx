import { FrameSelector } from "@app/components/modules";
import { ButtonHeader } from "@app/components/shared";
import Layout from "@app/components/shared/Layout";
import React, { useState } from "react";

interface FrameHome {
  frameInput?: any;
  Step?: any;
  setStep: (x: any) => void;
  frames?: Array<any>;
  onSelect: (x: any) => void;
}

export default function FrameHome({ frameInput, onSelect, frames }: FrameHome) {
  const [selected, setSelected] = useState<any>(null); 
  return (
    <Layout
      title="Select a frame"
      headerComponent={
        selected && (
          <ButtonHeader action={() => onSelect(selected)} label="NEXT" />
        )
      }
    >
      <FrameSelector
        onSelect={(item) => setSelected(item)}
        frame={frameInput}
        frames={frames}
      />
    </Layout>
  );
}
