"use client";
import { useEffect, useId, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

type SparklesProps = {
  className?: string;
  size?: number;
  minSize?: number | null;
  density?: number;
  speed?: number;
  minSpeed?: number | null;
  opacity?: number;
  direction?: string;
  opacitySpeed?: number;
  minOpacity?: number | null;
  color?: string;
  mousemove?: boolean;
  hover?: boolean;
  background?: string;
};

let particlesEngineReady: Promise<void> | null = null;

export function Sparkles({
  className,
  size = 1.2,
  minSize = null,
  density = 800,
  speed = 1.5,
  minSpeed = null,
  opacity = 1,
  direction = "none",
  opacitySpeed = 3,
  minOpacity = null,
  color = "#ffffff",
  mousemove = false,
  hover = false,
  background = "transparent",
}: SparklesProps) {
  const [isReady, setIsReady] = useState(false);
  const id = useId();

  useEffect(() => {
    particlesEngineReady ??= initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });

    particlesEngineReady.then(() => setIsReady(true));
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: background,
        },
      },
      fullScreen: {
        enable: false,
        zIndex: 1,
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: hover,
            mode: "grab",
            parallax: {
              enable: mousemove,
              force: 45,
              smooth: 12,
            },
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 120,
            links: {
              opacity: 0.18,
            },
          },
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        color: {
          value: color,
        },
        move: {
          enable: true,
          direction,
          speed: {
            min: minSpeed ?? speed / 130,
            max: speed,
          },
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 900,
          },
          value: density,
        },
        opacity: {
          value: {
            min: minOpacity ?? opacity / 10,
            max: opacity,
          },
          animation: {
            enable: true,
            sync: false,
            speed: opacitySpeed,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: {
            min: minSize ?? size / 1.5,
            max: size,
          },
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.08,
            opacity: 1,
          },
        },
      },
      detectRetina: true,
    }),
    [
      background,
      color,
      density,
      direction,
      hover,
      minOpacity,
      minSize,
      minSpeed,
      mousemove,
      opacity,
      opacitySpeed,
      size,
      speed,
    ],
  );

  if (!isReady) return null;

  return <Particles id={id} options={options as never} className={className} />;
}
