"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type AnimatedImageProps = ImageProps & {
  wrapperClassName?: string;
};

export function AnimatedImage({
  className,
  wrapperClassName,
  onLoad,
  ...props
}: AnimatedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      className={cn(
        "transition-opacity duration-[600ms] ease-out",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
      onLoad={(e) => {
        setLoaded(true);
        if (onLoad) onLoad(e);
      }}
    />
  );
}
