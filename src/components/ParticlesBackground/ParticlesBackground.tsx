import "./ParticlesBackground.css";
import { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: "#0b0914",
      },
      particles: {
        number: {
          value: 80,
        },
        color: {
          value: ["#9146ff", "#d896ff"],
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.6,
          random: true,
        },
        size: {
          value: 3,
          random: true,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          outModes: "out",
        },
        links: {
          enable: true,
          distance: 150,
          color: "#9146ff",
          opacity: 0.4,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 100,
          },
        },
      },
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
      />
    );
  }

  return <></>;
};

export default ParticlesBackground;
