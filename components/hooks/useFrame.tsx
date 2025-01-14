import {  useMemo } from 'react';

export default function useFrame(campaignConfig:any) { 

    const frames = useMemo(() => {
        const frameInput = campaignConfig?.inputs?.find((x: any) => x.id === "frames");
        if (frameInput) {
            return frameInput.options
        }
        return []
    }, [campaignConfig])


    return { frames }
}
