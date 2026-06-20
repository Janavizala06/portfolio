"use client";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Globe({ size = 300 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 2,
      mapSamples: 20000,
      mapBrightness: 6,
      baseColor: [0.05, 0.1, 0.2],
      markerColor: [0.2, 0.7, 1],
      glowColor: [0.1, 0.4, 1],
      markers: [{ location: [23.0225, 72.5714], size: 0.08 }],
      onRender: ((state: any) => {
        state.phi = phi;
        phi += 0.004;
      }) as any,
    } as any);
    return () => globe.destroy();
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, maxWidth: "100%", aspectRatio: "1" }}
    />
  );
}
