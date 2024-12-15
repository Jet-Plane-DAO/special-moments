import { FrameSelector } from '@app/components/modules';
import { Button } from '@app/components/shared';
import Layout from '@app/components/shared/Layout';
import React from 'react' 

interface FrameHome {
    frameInput?: any;
    Step?: any;
    setStep: (x:any) => void;
    setFrameInput: (x:any) => void;
    frames?: Array<any>;
}

export default function FrameHome({frameInput, Step, setStep, setFrameInput, frames}:FrameHome) {
  return (
    <Layout
        title="Select a frame"
        headerComponent={
          <Button
            onClick={() =>
              !frameInput ? setStep(Step.IMAGE) : setStep(Step.PFP)
            }
          >
            {!frameInput ? "BACK" : "NEXT"}
          </Button>
        }
      >
        <FrameSelector
          onSelect={(frame) => {
            setFrameInput(frame);
          }}
          frame={frameInput}
          frames={frames}
        />
      </Layout>
  )
}
