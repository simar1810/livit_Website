"use client";

import React from "react";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  as?: "button" | "a";
  href?: string;
  className?: string;
}

export default function PrimaryButton({
  children,
  as = "button",
  href,
  className = "",
  ...rest
}: PrimaryButtonProps) {
  const baseClass = "primary-btn";
  const combined = className ? `${baseClass} ${className}` : baseClass;

  if (as === "a" && href !== undefined) {
    return (
      <a href={href} className={combined} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={combined} {...rest}>
      {children}
    </button>
  );
}
