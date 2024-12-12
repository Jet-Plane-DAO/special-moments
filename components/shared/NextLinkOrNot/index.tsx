import NextLink from "next/link";
import { NextLinkOrNotProps } from "./interface";
import { forwardRef } from "react";

export const NextLinkOrNot = forwardRef<HTMLAnchorElement, NextLinkOrNotProps>(
  ({ children, href, target, ...props }, ref) => {
    const isNextLink =
      (!href?.includes("://") &&
        !href?.startsWith("#") &&
        !href.includes("mailto:")) ??
      false;

    const rel = target === "_blank" ? "noopener noreferrer" : "";

    const baseProps: NextLinkOrNotProps = {
      href,
      target,
      rel,
    };

    if (isNextLink) {
      return (
        <NextLink {...baseProps} {...props} ref={ref}>
          {children}
        </NextLink>
      );
    }

    return (
      <a {...baseProps} {...props} ref={ref}>
        {children}
      </a>
    );
  }
);

NextLinkOrNot.displayName = "NextLinkOrNot";

export default NextLinkOrNot;
