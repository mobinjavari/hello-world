import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
import pug from "pug";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const { AD_TEXT, AD_LINK, GITHUB_USERNAME } = process.env;
const missingVars = Object.entries({ AD_TEXT, AD_LINK, GITHUB_USERNAME })
  .filter(([, value]) => !value)
  .map(([name]) => name);
if (missingVars.length > 0) {
  console.error(
    `Missing ${missingVars.join(", ")}. Create .env from .env.example and run with --env-file=.env, or set them directly in the environment.`
  );
  process.exit(1);
}

async function contentHash(relativePath) {
  const content = await readFile(path.join(rootDir, "dist", relativePath));
  return createHash("sha256").update(content).digest("hex").slice(0, 8);
}

const html = pug.renderFile(path.join(rootDir, "src", "views", "index.pug"), {
  adText: AD_TEXT,
  adLink: AD_LINK,
  githubUsername: GITHUB_USERNAME,
  cssVersion: await contentHash("css/app.css"),
  jsVersion: await contentHash("js/app.js"),
});

await mkdir(path.join(rootDir, "dist"), { recursive: true });
await writeFile(path.join(rootDir, "dist", "index.html"), html);
