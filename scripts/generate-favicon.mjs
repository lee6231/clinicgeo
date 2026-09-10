import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const svg = await readFile(new URL("../public/favicon.svg", import.meta.url));

await sharp(svg).resize(512, 512).png().toFile(fileURLToPath(new URL("../app/icon.png", import.meta.url)));
await sharp(svg).resize(180, 180).png().toFile(fileURLToPath(new URL("../app/apple-icon.png", import.meta.url)));

const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((size) => sharp(svg).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);

let offset = 6 + images.length * 16;
const entries = images.map((image, index) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(sizes[index], 0);
  entry.writeUInt8(sizes[index], 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(image.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += image.length;
  return entry;
});

await writeFile(new URL("../app/favicon.ico", import.meta.url), Buffer.concat([header, ...entries, ...images]));
