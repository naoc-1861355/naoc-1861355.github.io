import React, { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./Home.css";

export default function Home() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: "transparent" },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 100, density: { enable: true, area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          outModes: { default: "out" },
        },
        links: {
          enable: false,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "connect" },
          resize: true,
        },
        modes: {
          connect: {
            distance: 120,
            radius: 140,
            links: { opacity: 0.4 },
          },
        },
      },
    }),
    []
  );

  return (
    <div className="home">
      <Particles id="tsparticles" init={particlesInit} options={options} />
      <div className="home__content">
        <h1>HOMEPAGE</h1>
      </div>
    </div>
  );
}
