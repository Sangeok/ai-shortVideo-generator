import { ImageMetadata, ImageOptions } from "./type";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

// 이미지 및 메타데이터 디렉토리 경로 정의
const imagesDir = path.join(process.cwd(), "public", "generated-images");
const metadataDir = path.join(process.cwd(), "data", "metadata");

// 디렉토리가 존재하는지 확인하고 없으면 생성하는 함수
async function ensureDirectory(dir: string) {
  try {
    await fs.access(dir);
  } catch (error) {
    // 디렉토리가 없으면 생성 (recursive: true로 중간 경로도 모두 생성)
    await fs.mkdir(dir, { recursive: true });
    console.log(`디렉토리 생성됨: ${dir}`);
  }
}

export async function saveImage(
  imageData: string,
  prompt: string,
  mimeType: string = "image/png",
  options: ImageOptions = {}
): Promise<ImageMetadata> {
  // 필요한 디렉토리 생성
  await ensureDirectory(imagesDir);
  await ensureDirectory(metadataDir);

  // Generate a unique ID
  const id = crypto.randomUUID();

  // Generate a unique filename
  const hash = crypto
    .createHash("md5")
    .update(prompt + Date.now().toString())
    .digest("hex");
  const extension = mimeType.split("/")[1];
  const filename = `${hash}.${extension}`;
  const filePath = path.join(imagesDir, filename);

  // Save the image to disk
  const buffer = Buffer.from(imageData, "base64");
  await fs.writeFile(filePath, buffer);

  // Create image metadata
  const metadata: ImageMetadata = {
    id,
    prompt,
    createdAt: new Date().toISOString(),
    filename,
    mimeType,
    size: buffer.length,
    url: `${filename}`,
  };

  // Save metadata to disk
  const metadataPath = path.join(metadataDir, `${id}.json`);
  await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));

  return metadata;
}
