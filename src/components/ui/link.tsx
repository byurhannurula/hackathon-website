import React from "react";
import NextLink from "next/link";

import { cn } from "@/lib/utils";
import {
  buttonSizes,
  buttonVariants,
  buttonBase,
  type ButtonSize,
  type ButtonVariant,
} from "./button-styles";

export type LinkVariant = "link" | ButtonVariant;

interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: LinkVariant;
  size?: ButtonSize;
  /** Force external/internal behavior. Auto-detected from href if omitted. */
  external?: boolean;
}

const EXTERNAL_RE = /^(https?:)?\/\/|^(mailto|tel):/i;

const linkTextSize: Record<ButtonSize, string> = {
  xs: "text-[10px]",
  sm: "text-[11px]",
  md: "text-[13px]",
  lg: "text-[15px]",
};

const linkVariantClass = "font-mono no-underline text-white/55 hover:text-acid transition-colors";

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, variant = "link", size = "md", external, className, children, ...props }, ref) => {
    const isExternal = external ?? EXTERNAL_RE.test(href);

    const classes =
      variant === "link"
        ? cn(linkVariantClass, linkTextSize[size], className)
        : cn(
            buttonBase,
            buttonSizes[size].button,
            buttonVariants[variant],
            "no-underline",
            className
          );

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <NextLink ref={ref} href={href} className={classes} {...props}>
        {children}
      </NextLink>
    );
  }
);
Link.displayName = "Link";
