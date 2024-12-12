import { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

export type NextLinkOrNotProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;
