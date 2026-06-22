"use client";
import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

type EarthProps = {
  className?: string;
  theta?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
};

const markers: Array<{ location: [number, number]; size: number }> = [

];

export function Earth({
  className,
  theta = 0.25,
  dark = 1,
  scale = 1.08,
  diffuse = 1.2,
  mapSamples = 5000,
  mapBrightness = 6,
  baseColor = [0.4, 0.6509, 1],
  markerColor = [0.16, 0.65, 1],
  glowColor = [0.15, 0.42, 0.86],
}: EarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pointerInteraction = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [size, setSize] = useState(560);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new ResizeObserver(([entry]) => {
      const nextSize = Math.floor(entry.contentRect.width);
      setSize(nextSize);
    });

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;
    let width = size;
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const globe = createGlobe(canvas, {
      devicePixelRatio,
      width: width * devicePixelRatio,
      height: width * devicePixelRatio,
      phi: 0,
      theta,
      dark,
      diffuse,
      mapSamples,
      mapBrightness,
      baseColor,
      markerColor,
      glowColor,
      scale,
      offset: [0, 0],
      markers,
      onRender: (state) => {
        if (!pointerInteraction.current) {
          phi += 0.0035;
        }

        state.phi = phi + pointerInteractionMovement.current;
        state.width = width * devicePixelRatio;
        state.height = width * devicePixelRatio;
      },
    });

    setTimeout(() => {
      if (canvas) {
        canvas.style.opacity = "1";
      }
    }, 80);

    return () => globe.destroy();
  }, [
    baseColor,
    dark,
    diffuse,
    glowColor,
    mapBrightness,
    mapSamples,
    markerColor,
    scale,
    size,
    theta,
  ]);

  return (
    <div ref={wrapperRef} className={className}>
      <canvas
        ref={canvasRef}
        className="earth-canvas"
        style={{ width: size, height: size, maxWidth: "100%", aspectRatio: "1" }}
        onPointerDown={(event) => {
          pointerInteraction.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={() => {
          pointerInteraction.current = null;
        }}
        onPointerOut={() => {
          pointerInteraction.current = null;
        }}
        onPointerMove={(event) => {
          if (pointerInteraction.current !== null) {
            const delta = event.clientX - pointerInteraction.current;
            pointerInteractionMovement.current = delta / 180;
          }
        }}
      />
    </div>
  );
}
