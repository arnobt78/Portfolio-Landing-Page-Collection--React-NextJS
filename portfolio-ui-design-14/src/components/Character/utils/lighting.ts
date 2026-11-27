/**
 * Scene lighting: directional + point light, HDR environment. setPointLight
 * drives point light from character’s screen light mesh; turnOnLights runs after intro.
 */
import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene, onEnvironmentReady?: () => void) => {
  const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  let disposed = false;
  let lightsOn = false;
  let rimTween: gsap.core.Tween | undefined;
  let environment: THREE.Texture | undefined;
  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      if (disposed) { texture.dispose(); return; }
      environment = texture;
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = lightsOn ? 0.64 : 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
      onEnvironmentReady?.();
    }, undefined, () => { /* Character lighting remains usable without the HDR. */ });

  function setPointLight(screenLight: THREE.Object3D | null) {
    if (!screenLight || !(screenLight as THREE.Mesh).material) return;
    const mat = (screenLight as THREE.Mesh).material as THREE.MeshStandardMaterial;
    if (mat.opacity > 0.9) {
      pointLight.intensity = (mat.emissiveIntensity ?? 0) * 20;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights(reducedMotion = false) {
    lightsOn = true;
    if (reducedMotion) {
      gsap.killTweensOf(scene);
      gsap.killTweensOf(directionalLight);
      rimTween?.kill();
      rimTween = undefined;
      scene.environmentIntensity = 0.64;
      directionalLight.intensity = 1;
      gsap.set(".character-rim", { y: "55%", opacity: 1 });
      return;
    }
    gsap.to(scene, {
      environmentIntensity: 0.64,
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 1,
      duration: duration,
      ease: ease,
    });
    rimTween?.kill();
    rimTween = gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  function dispose() {
    disposed = true;
    gsap.killTweensOf(scene);
    gsap.killTweensOf(directionalLight);
    rimTween?.kill();
    rimTween = undefined;
    directionalLight.shadow.dispose();
    pointLight.shadow.dispose();
    environment?.dispose();
    scene.environment = null;
  }

  return { setPointLight, turnOnLights, dispose };
};

export default setLighting;
