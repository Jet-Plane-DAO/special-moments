import { FrameSelector } from "@app/components/modules";
import {
  ButtonHeader,
  ButtonHeaderProps,
} from "@app/components/shared";
import Layout from "@app/components/shared/Layout";
import React, { useState } from "react";

interface PostcardHome {
  postcardInput?: any;
  postcards?: Array<any>;
  onSelect: (x: any) => void;
  headerCTA?: ButtonHeaderProps;
}

export default function PostcardHome({
  postcardInput,
  onSelect,
  postcards,
  headerCTA,
}: PostcardHome) {
  const [selected, setSelected] = useState<any>(null);
  return (
    <Layout
      title="Select a postcard"
      headerComponent={
        headerCTA ? (
          <ButtonHeader
            action={() => (selected ? onSelect(selected) : headerCTA?.action())}
            label={selected ? "NEXT" : headerCTA.label}
          />
        ) : null
      }
    >
      <FrameSelector
        onSelect={(item) => setSelected(item)}
        frame={postcardInput}
        frames={postcards}
        className={'postcard'}
      />
    </Layout>
  );
}
