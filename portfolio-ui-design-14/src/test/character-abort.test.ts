import { beforeEach, describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import setCharacter from "../components/Character/utils/character";

const loaderMocks = vi.hoisted(() => ({
  parse: vi.fn(),
  dispose: vi.fn(),
  decrypt: vi.fn(),
}));

vi.mock("three-stdlib", () => ({
  GLTFLoader: class {
    setDRACOLoader() {}
    parse(...args: unknown[]) { loaderMocks.parse(...args); }
  },
  DRACOLoader: class {
    setDecoderPath() {}
    dispose() { loaderMocks.dispose(); }
  },
}));
vi.mock("../components/Character/utils/decrypt", () => ({ decryptFile: loaderMocks.decrypt }));

function model() {
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.MeshBasicMaterial();
  const geometryDispose = vi.spyOn(geometry, "dispose");
  const materialDispose = vi.spyOn(material, "dispose");
  const scene = new THREE.Group();
  scene.add(new THREE.Mesh(geometry, material));
  return { gltf: { scene, animations: [] }, geometryDispose, materialDispose };
}
function setup(compileAsync = vi.fn().mockResolvedValue(undefined)) {
  const renderer = { compileAsync } as unknown as THREE.WebGLRenderer;
  return { loader: setCharacter(renderer, new THREE.Scene(), new THREE.PerspectiveCamera()), compileAsync };
}

beforeEach(() => {
  vi.clearAllMocks();
  loaderMocks.decrypt.mockResolvedValue(new ArrayBuffer(8));
});

describe("character loader cancellation", () => {
  it("rejects promptly on abort during parse and disposes a late decoded model", async () => {
    let completeParse!: (value: ReturnType<typeof model>["gltf"]) => void;
    loaderMocks.parse.mockImplementation((_buffer, _path, onLoad) => { completeParse = onLoad; });
    const { loader, compileAsync } = setup();
    const controller = new AbortController();
    const pending = loader.loadCharacter(controller.signal);
    await vi.waitFor(() => expect(loaderMocks.parse).toHaveBeenCalledOnce());
    controller.abort();
    await expect(pending).rejects.toMatchObject({ name: "AbortError" });
    const late = model();
    completeParse(late.gltf);
    await vi.waitFor(() => expect(late.geometryDispose).toHaveBeenCalledOnce());
    expect(late.materialDispose).toHaveBeenCalledOnce();
    expect(compileAsync).not.toHaveBeenCalled();
    expect(loaderMocks.dispose).toHaveBeenCalled();
  });

  it("rejects promptly on abort during compilation and releases the parsed model", async () => {
    const parsed = model();
    loaderMocks.parse.mockImplementation((_buffer, _path, onLoad) => { onLoad(parsed.gltf); });
    const compile = vi.fn().mockImplementation(() => new Promise(() => {}));
    const { loader } = setup(compile);
    const controller = new AbortController();
    const pending = loader.loadCharacter(controller.signal);
    await vi.waitFor(() => expect(compile).toHaveBeenCalledOnce());
    controller.abort();
    await expect(pending).rejects.toMatchObject({ name: "AbortError" });
    expect(parsed.geometryDispose).toHaveBeenCalledOnce();
    expect(parsed.materialDispose).toHaveBeenCalledOnce();
    expect(loaderMocks.dispose).toHaveBeenCalled();
  });

  it("returns the model normally without disposing its resources", async () => {
    const parsed = model();
    loaderMocks.parse.mockImplementation((_buffer, _path, onLoad) => { onLoad(parsed.gltf); });
    const { loader, compileAsync } = setup();
    const result = await loader.loadCharacter(new AbortController().signal);
    expect(result.scene).toBe(parsed.gltf.scene);
    expect(compileAsync).toHaveBeenCalledOnce();
    expect(parsed.geometryDispose).not.toHaveBeenCalled();
    expect(parsed.materialDispose).not.toHaveBeenCalled();
    expect(loaderMocks.dispose).toHaveBeenCalled();
  });
});
