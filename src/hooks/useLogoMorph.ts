"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type UseLogoMorphOptions = {
  start?: string;
  end?: string;
  scrub?: boolean | number;
};

export function useLogoMorph(options: UseLogoMorphOptions = {}) {
  const { start = "top top+=56", end = "+=320", scrub = true } = options;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = document.querySelector("#hero-pin");
    if (!trigger) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger,
        start,
        end,
        scrub,
        onUpdate: (self) => {
          document.documentElement.style.setProperty("--logo-morph", String(self.progress));
        },
      });
    }, trigger);

    return () => ctx.revert();
  }, [start, end, scrub]);
}
