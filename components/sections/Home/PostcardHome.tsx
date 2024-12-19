import { FrameSelector } from "@app/components/modules";
import {
  Button,
  ButtonHeader,
  ButtonHeaderProps,
} from "@app/components/shared";
import Layout from "@app/components/shared/Layout";
import React from "react";

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
  return (
    <Layout
      title="Select a postcard"
      headerComponent={
        headerCTA ? (
          <ButtonHeader action={headerCTA?.action} label={headerCTA.label} />
        ) : null
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
