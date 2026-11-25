/**
 * IntroAnimation: full-screen intro that cycles through greeting strings (multi-language),
 * then runs a GSAP timeline (slide up + SVG morph) and calls onFinish() when done.
 * Parent (App) uses onFinish to unmount this and show the main content.
 */
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

export default function IntroAnimation({ onFinish }) {
  /* Greeting strings shown one after another; last one triggers the exit animation. */
  const greetings = [
    "Hello", "नमस्ते", "Hola", "Bonjour",
    "Ciao", "Olá", "Здравствуйте",
    "Merhaba", "Γειά", "Hej", "Hallo", "Salam"
  ];

  const [index, setIndex] = useState(0);
  const overlayRef = useRef(null);
  const greetingRef = useRef(null);

  /* When index is before the last greeting: animate current text in, then advance index. */
  useEffect(() => {
    let greetingTimer;
    let animation;
    let timeline;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      greetingTimer = setTimeout(onFinish, 0);
      return () => { clearTimeout(greetingTimer); animation?.kill(); timeline?.kill(); };
    }

    if (index < greetings.length - 1) {
      animation = gsap.fromTo(
        greetingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.12 }
      );
      greetingTimer = setTimeout(() => setIndex(i => i + 1), 180);
    } else {
      /* Last greeting: show it, then after 300ms run exit timeline (slide up + morph path). */
      animation = gsap.fromTo(
        greetingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.12 }
      );

      greetingTimer = setTimeout(() => {
        timeline = gsap.timeline({
          onComplete: () => onFinish && onFinish(),
        });

        timeline.to([overlayRef.current, greetingRef.current], {
          duration: 1.8,
          y: "-100vh",
          ease: "power4.inOut",
        }).to(
          overlayRef.current.querySelector("path"),
          {
            duration: 1.8,
            morphSVG: "M0,0 L0,300 Q720,900 1440,300 L1440,0 Z",
            ease: "power4.inOut",
          },
          "<"
        );
      }, 300);
    }

    return () => { clearTimeout(greetingTimer); animation?.kill(); timeline?.kill(); };
  }, [index, onFinish, greetings.length]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center text-white overflow-hidden pointer-events-none"
    >
      <h1
        ref={greetingRef}
        className="text-5xl md:text-7xl lg:text-8xl font-bold absolute z-20"
      >
        {greetings[index]}
      </h1>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path fill="black" d="M0,0 L0,900 L1440,900 L1440,0 Z" />
      </svg>
    </div>
  );
}
