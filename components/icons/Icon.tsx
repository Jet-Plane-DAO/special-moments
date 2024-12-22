import React, { ReactNode } from "react";
import { IconProps } from "./types";

export default function Icon({
  children,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <svg width="1em" height="1em" {...props}>
      {children}
    </svg>
  );
}
