import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";

// REQ-0001: the restored Git LFS asset must be the full original model.
it("retains the hash-verified character model", () => {
  const model = readFileSync("public/models/character.glb");
  expect(model.length).toBe(1537316);
  expect(model.subarray(0, 4).toString("ascii")).toBe("glTF");
  expect(createHash("sha256").update(model).digest("hex")).toBe("c287a4d10bbbbc4c779f7b0a68b666b530ef9754142843aa048b4d5976c0d052");
});
