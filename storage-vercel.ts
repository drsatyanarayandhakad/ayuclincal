// Vercel Blob storage adapter
// Replaces Manus Forge storage for Vercel deployments

import { put, get, del } from "@vercel/blob";
import { nanoid } from "nanoid";

function appendHashSuffix(relKey: string): string {
  const hash = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  const lastDot = relKey.lastIndexOf(".");
  if (lastDot === -1) return `${relKey}_${hash}`;
  return `${relKey.slice(0, lastDot)}_${hash}${relKey.slice(lastDot)}`;
}

function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "");
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream",
): Promise<{ key: string; url: string }> {
  const key = appendHashSuffix(normalizeKey(relKey));

  try {
    const blob = await put(key, data, {
      contentType,
      access: "public",
    });

    return { key, url: blob.url };
  } catch (error) {
    throw new Error(`Storage upload failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  try {
    const blob = await get(key);
    if (!blob) {
      throw new Error(`Blob not found: ${key}`);
    }
    return { key, url: blob.url };
  } catch (error) {
    throw new Error(`Storage get failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function storageGetSignedUrl(relKey: string): Promise<string> {
  const key = normalizeKey(relKey);
  try {
    const blob = await get(key);
    if (!blob) {
      throw new Error(`Blob not found: ${key}`);
    }
    // Vercel Blob URLs are already public and signed
    return blob.url;
  } catch (error) {
    throw new Error(`Storage signed URL failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function storageDelete(relKey: string): Promise<void> {
  const key = normalizeKey(relKey);
  try {
    await del(key);
  } catch (error) {
    throw new Error(`Storage delete failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
