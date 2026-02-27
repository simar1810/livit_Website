"use client";

import React from "react";

export interface PackageCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  ctaLabel: string;
  onCtaClick: () => void;
  className?: string;
}

export default function PackageCard({
  title,
  description,
  imageSrc,
  imageAlt,
  ctaLabel,
  onCtaClick,
  className = "",
}: PackageCardProps) {
  return (
    <div className={`product_wrp ${className}`}>
      <div className="pro_img">
        {/* When assets are in public/, consider next/image for optimization */}
        <img src={imageSrc} alt={imageAlt} loading="lazy" />
      </div>
      <div className="pro_con">
        <h2>{title}</h2>
        <p>{description}</p>
        <a className="join" onClick={onCtaClick} role="button">
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
