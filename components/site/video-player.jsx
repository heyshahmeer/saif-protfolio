"use client";
import { useState } from "react";

export function VideoPlayer({ id, title, thumb }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-black shadow-xl shadow-primary/10">
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button onClick={() => setPlay(true)} aria-label={`Play ${title}`} className="group absolute inset-0 w-full">
          <img
            src={thumb}
            alt=""
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = thumb.replace("maxresdefault", "hqdefault"); }}
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/10" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="relative grid h-24 w-24 place-items-center rounded-full bg-signal pl-1 text-3xl text-ink transition-transform duration-500 group-hover:scale-110">
              <span className="absolute inset-0 animate-ping rounded-full bg-signal/40" />
              <span className="relative">▶</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}