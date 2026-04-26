"use client";

import { useState, type AnchorHTMLAttributes } from "react";

import { useDecryptText } from "@/hooks";

interface DecryptLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: string;
}

export function DecryptLink({ href, children, className, ...props }: DecryptLinkProps) {
  const [hover, setHover] = useState(false);
  const text = useDecryptText(children, { active: hover, speed: 22 });
  const isExternal = /^(https?:)?\/\/|^(mailto|tel):/i.test(href);

  return (
    <a
      href={href}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {text}
    </a>
  );
}
