/**
 * Applies GSAP split-text animations to .para (words) and .title (chars).
 * Called on mount/resize from MainContainer. Reverts previous split/anim before re-splitting.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitSingleElement, type SplitResult } from "../../utils/splitTextFree";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Tween;
  split?: SplitResult;
}

gsap.registerPlugin(ScrollTrigger);

// Revert both the generated DOM and its ScrollTriggers on preference changes or unmount.
export function clearSplitText() {
  document.querySelectorAll<ParaElement>(".para, .title").forEach((element) => {
    element.anim?.scrollTrigger?.kill();
    element.anim?.progress(1).kill();
    element.split?.revert();
    delete element.anim;
    delete element.split;
  });
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  clearSplitText();
  if (window.innerWidth < 900 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const paras = document.querySelectorAll<ParaElement>(".para");
  const titles = document.querySelectorAll<ParaElement>(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    para.split = splitSingleElement(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement ?? para,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title: ParaElement) => {
    title.split = splitSingleElement(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement ?? title,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

}
