import { FrameSelector } from "@app/components/modules";
import { ButtonHeader } from "@app/components/shared";
import Layout from "@app/components/shared/Layout";
import { useState } from "react";

interface SectionChooseFrameProps {
  frameInput?: any;
  frames?: Array<any>;
  onSelect: (x: any) => void;
}

export default function SectionChooseFrame({ frameInput, onSelect, frames }: SectionChooseFrameProps) {
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
