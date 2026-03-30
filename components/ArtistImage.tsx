"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  nombre: string;
}

export default function ArtistImage({ src, alt, nombre }: Props) {
  const [error, setError] = useState(false);

  const initials = nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (error || !src) {
    return (
      <div className="w-full h-full min-h-72 bg-linear-to-tr from-[#55CDFC] via-[#F7A8B8] to-[#FFFFFF] flex items-center justify-center border-2 border-black">
        <span className="text-black text-3xl font-bold">{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="border-2 border-black w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
      onError={() => setError(true)}
    />
  );
}