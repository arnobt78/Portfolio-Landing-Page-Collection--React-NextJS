/** Load the existing encrypted character through the local Draco decoder. */
import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { decryptFile } from "./decrypt";

// Dispose GPU resources when a scene is replaced, including late async results.
export function disposeCharacter(root: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    geometries.add(object.geometry);
    const meshMaterials = Array.isArray(object.material) ? object.material : [object.material];
    meshMaterials.forEach((material) => {
      materials.add(material);
      Object.values(material).forEach((value) => {
        if (value instanceof THREE.Texture) textures.add(value);
      });
    });
    if (object instanceof THREE.SkinnedMesh) object.skeleton.dispose();
  });
  textures.forEach((texture) => texture.dispose());
  materials.forEach((material) => material.dispose());
  geometries.forEach((geometry) => geometry.dispose());
}

// Reject promptly when parsing or shader compilation outlives the scene.
// A parsed result arriving after cancellation still owns GPU resources and must be disposed.
function waitForResult<T>(signal: AbortSignal, task: Promise<T>, disposeLate?: (value: T) => void): Promise<T> {
  return new Promise((resolve, reject) => {
    let settled = false;
    const onAbort = () => {
      if (settled) return;
      settled = true;
      signal.removeEventListener("abort", onAbort);
      reject(new DOMException("Cancelled", "AbortError"));
    };
    signal.addEventListener("abort", onAbort, { once: true });
    if (signal.aborted) onAbort();
    task.then((value) => {
      if (settled) { disposeLate?.(value); return; }
      settled = true;
      signal.removeEventListener("abort", onAbort);
      resolve(value);
    }, (error: unknown) => {
      if (settled) return;
      settled = true;
      signal.removeEventListener("abort", onAbort);
      reject(error);
    });
  });
}

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async (signal: AbortSignal): Promise<GLTF> => {
    const onAbort = () => dracoLoader.dispose();
    signal.addEventListener("abort", onAbort, { once: true });
    let gltf: GLTF | undefined;
    try {
      const data = await decryptFile("/models/character.enc", "Character3D#@", signal);
      if (signal.aborted) throw new DOMException("Cancelled", "AbortError");
      // Parsing the buffer directly avoids retaining an object URL for the model.
      gltf = await waitForResult(signal, new Promise<GLTF>((resolve, reject) => loader.parse(data, "", resolve, reject)),
        (lateGltf) => disposeCharacter(lateGltf.scene));
      if (signal.aborted) throw new DOMException("Cancelled", "AbortError");
      await waitForResult(signal, renderer.compileAsync(gltf.scene, camera, scene));
      if (signal.aborted) throw new DOMException("Cancelled", "AbortError");
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.frustumCulled = true;
        }
      });
      const rightFoot = gltf.scene.getObjectByName("footR");
      const leftFoot = gltf.scene.getObjectByName("footL");
      if (rightFoot) rightFoot.position.y = 3.36;
      if (leftFoot) leftFoot.position.y = 3.36;
      return gltf;
    } catch (error) {
      if (gltf) disposeCharacter(gltf.scene);
      throw error;
    } finally {
      signal.removeEventListener("abort", onAbort);
      dracoLoader.dispose();
    }
  };

  return { loadCharacter };
};

export default setCharacter;
