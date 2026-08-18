import { cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const srcDir = path.join(rootDir, "src");
const distDir = path.join(rootDir, "dist");

await Promise.all(
  ["images", "js"].map((dir) => cp(path.join(srcDir, dir), path.join(distDir, dir), { recursive: true }))
);
