/** The character scene is optional: loading or graphics failures must not block the page. */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter, { disposeCharacter } from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import { handleMouseMove, handleTouchEnd, handleHeadRotation, handleTouchMove } from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const [unavailable, setUnavailable] = useState(false);
  const { setLoading, finishLoading, isFallback, fallbackActive } = useLoading();
  const onFallback = useRef<() => void>(() => {});

  useEffect(() => {
    const canvasEl = canvasDiv.current;
    if (!canvasEl) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      // Renderer creation can fail synchronously when WebGL is unavailable.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUnavailable(true);
      finishLoading();
      return;
    }

    const scene = new THREE.Scene();
    const rect = canvasEl.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasEl.appendChild(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(14.5, rect.height ? rect.width / rect.height : 1, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    const abort = new AbortController();
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let renderStatic = () => {};
    const light = setLighting(scene, () => renderStatic());
    const progress = setProgress(setLoading);
    const { loadCharacter } = setCharacter(renderer, scene, camera);
    const clock = new THREE.Clock();
    let active = true;
    let failed = false;
    let progressReady = false;
    let introStarted = false;
    let frame = 0;
    let shutdown = () => {};
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let introTimer: ReturnType<typeof setTimeout> | undefined;
    let touchTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelTouchReset: (() => void) | undefined;
    let removeHover: (() => void) | undefined;
    let clearTimelines: (() => void) | undefined;
    let animations: ReturnType<typeof setAnimations> | undefined;
    let model: THREE.Object3D | undefined;
    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };
    let touchTracking = false;

    // Release partially initialized resources too, not only successfully loaded scenes.
    const releaseModel = () => {
      removeHover?.();
      removeHover = undefined;
      clearTimelines?.();
      clearTimelines = undefined;
      animations?.dispose();
      animations = undefined;
      headBone = null;
      screenLight = null;
      if (model) {
        scene.remove(model);
        disposeCharacter(model);
        model = undefined;
      }
    };
    const failScene = () => {
      if (!active || failed) return;
      failed = true;
      shutdown();
      setUnavailable(true);
      finishLoading();
    };
    const refreshTimelines = () => {
      if (!model) return;
      clearTimelines?.();
      clearTimelines = undefined;
      if (motionPreference.matches || isFallback()) return;
      const clearCharacter = setCharTimeline(model, camera);
      try {
        const clearCareer = setAllTimeline();
        clearTimelines = () => { clearCharacter(); clearCareer(); };
      } catch (error) {
        clearCharacter();
        throw error;
      }
    };
    const onResize = () => {
      handleResize(renderer, camera, canvasDiv);
      renderStatic();
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        try { refreshTimelines(); } catch { failScene(); }
      }, 150);
    };
    const onMouseMove = (event: MouseEvent) => handleMouseMove(event, (x, y) => { mouse = { x, y }; });
    const onTouchStart = () => {
      cancelTouchReset?.();
      clearTimeout(touchTimer);
      touchTimer = setTimeout(() => { touchTracking = true; }, 200);
    };
    const onTouchMove = (event: TouchEvent) => {
      if (touchTracking && event.touches.length) handleTouchMove(event, (x, y) => { mouse = { x, y }; });
    };
    const onTouchEnd = () => {
      clearTimeout(touchTimer);
      touchTracking = false;
      cancelTouchReset?.();
      cancelTouchReset = handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };
    const onContextLost = () => failScene();
    window.addEventListener("resize", onResize);
    document.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    const landing = document.getElementById("landingDiv");
    landing?.addEventListener("touchstart", onTouchStart, { passive: true });
    landing?.addEventListener("touchmove", onTouchMove, { passive: true });
    landing?.addEventListener("touchend", onTouchEnd);
    landing?.addEventListener("touchcancel", onTouchEnd);

    const animate = () => {
      if (!active || failed) return;
      frame = 0;
      if (!motionPreference.matches && !isFallback()) {
        frame = requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(headBone, mouse.x, mouse.y, interpolation.x, interpolation.y, THREE.MathUtils.lerp);
          light.setPointLight(screenLight);
        }
        animations?.mixer.update(clock.getDelta());
      }
      try { renderer.render(scene, camera); } catch { failScene(); }
    };
    // Render on asset or layout changes, without a continuous animation loop.
    renderStatic = () => { if (motionPreference.matches || isFallback()) animate(); };
    // One startup path owns the intro; media preference changes never replay it.
    const scheduleIntro = () => {
      if (!active || failed || !model || !progressReady || introStarted || introTimer || motionPreference.matches || isFallback()) return;
      introTimer = setTimeout(() => {
        introTimer = undefined;
        if (!active || failed || motionPreference.matches || isFallback() || introStarted) return;
        introStarted = true;
        light.turnOnLights();
        animations?.startIntro();
      }, 2500);
    };
    onFallback.current = () => {
      if (!active || failed || !isFallback()) return;
      clearTimeout(introTimer);
      introTimer = undefined;
      cancelAnimationFrame(frame);
      frame = 0;
      progress.cancel();
      clearTimelines?.();
      clearTimelines = undefined;
      removeHover?.();
      removeHover = undefined;
      animations?.dispose();
      animations = undefined;
      if (model) light.turnOnLights(true);
      renderStatic();
    };
    const onMotionChange = () => {
      if (!active || failed) return;
      clearTimeout(introTimer);
      introTimer = undefined;
      if (isFallback()) { onFallback.current(); return; }
      if (motionPreference.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        clearTimelines?.();
        clearTimelines = undefined;
        if (model) light.turnOnLights(true);
        renderStatic();
      } else {
        try {
          if (model) {
            refreshTimelines();
            if (introStarted) light.turnOnLights();
            else scheduleIntro();
          }
          clock.getDelta();
          if (!frame) animate();
        } catch { failScene(); }
      }
    };
    motionPreference.addEventListener("change", onMotionChange);

    // Failure and unmount share one idempotent shutdown, including listeners and GPU resources.
    shutdown = () => {
      if (!active) return;
      active = false;
      abort.abort();
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      clearTimeout(introTimer);
      clearTimeout(touchTimer);
      cancelTouchReset?.();
      progress.cancel();
      releaseModel();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMouseMove);
      motionPreference.removeEventListener("change", onMotionChange);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      landing?.removeEventListener("touchstart", onTouchStart);
      landing?.removeEventListener("touchmove", onTouchMove);
      landing?.removeEventListener("touchend", onTouchEnd);
      landing?.removeEventListener("touchcancel", onTouchEnd);
      light.dispose();
      scene.clear();
      renderer.dispose();
      renderer.domElement.remove();
    };
    animate();

    loadCharacter(abort.signal).then((gltf) => {
      if (!active || abort.signal.aborted) { disposeCharacter(gltf.scene); return; }
      model = gltf.scene;
      if (!isFallback()) {
        animations = setAnimations(gltf);
        if (hoverDivRef.current) removeHover = animations.hover(gltf, hoverDivRef.current);
      }
      scene.add(model);
      headBone = model.getObjectByName("spine006") || null;
      screenLight = model.getObjectByName("screenlight") || null;
      refreshTimelines();
      if (motionPreference.matches || isFallback()) {
        light.turnOnLights(true);
        renderStatic();
      }
      if (isFallback()) { progress.cancel(); return; }
      void progress.loaded().then(() => {
        if (!active || failed) return;
        progressReady = true;
        scheduleIntro();
      });
    }).catch(failScene);

    return () => {
      onFallback.current = () => {};
      shutdown();
    };
  }, [finishLoading, isFallback, setLoading]);

  useEffect(() => {
    if (isFallback()) onFallback.current();
  }, [isFallback, fallbackActive]);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
        {unavailable && <p role="status" style={{ color: "white", textAlign: "center" }}>3D visual unavailable.</p>}
      </div>
    </div>
  );
};

export default Scene;
