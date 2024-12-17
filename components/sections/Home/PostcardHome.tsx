import { FrameSelector } from "@app/components/modules";
import { Button } from "@app/components/shared";
import Layout from "@app/components/shared/Layout";
import React from "react";

interface PostcardHome {
    frameInput?: any;
    Step?: any;
    setStep: (x: any) => void;
    // setFrameInput: (x:any) => void;
    frames?: Array<any>;
    onSelect: (x: any) => void;
}

export default function PostcardHome({ frameInput, Step, setStep, onSelect, frames }: PostcardHome) {
    return (
        <Layout title="Select a postcard" headerComponent={<Button onClick={() => (!frameInput ? setStep(Step.FRAME) : setStep(Step.PFP))}>{!frameInput ? "BACK" : "NEXT"}</Button>}>
            <FrameSelector onSelect={onSelect} frame={frameInput} frames={frames} />
        </Layout>
    );
}
