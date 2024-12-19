import { FrameSelector } from '@app/components/modules';
import Layout from '@app/components/shared/Layout';
import React from 'react' 

interface FrameHome {
  frameInput?: any;
  Step?: any;
  setStep: (x: any) => void;
  frames?: Array<any>;
  onSelect: (x: any) => void;
}

export default function FrameHome({
  frameInput,
  onSelect,
  frames,
}: FrameHome) {
  return (
    <Layout
      title="Select a frame"
    >
      <FrameSelector onSelect={onSelect} frame={frameInput} frames={frames} />
    </Layout>
  );
}
