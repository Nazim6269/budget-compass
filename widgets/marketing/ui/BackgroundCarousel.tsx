"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80",
    alt: "Financial planning and budgeting",
  },
  {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
    alt: "Mobile banking and payments",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
    alt: "Data analytics dashboard",
  },
  {
    src: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1600&q=80",
    alt: "Savings and investment growth",
  },
  {
    src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80",
    alt: "Stock market tracking",
  },
];

export default function BackgroundCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-textPrimary shadow hover:bg-white transition-colors cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-textPrimary shadow hover:bg-white transition-colors cursor-pointer"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
