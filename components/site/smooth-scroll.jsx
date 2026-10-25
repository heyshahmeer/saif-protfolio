"use client";
import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }) {
  return <ReactLenis root options={{ lerp: 0.09 }}>{children}</ReactLenis>;
}