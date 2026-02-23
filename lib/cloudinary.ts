import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

/**
 * Build a Cloudinary URL from a public ID.
 * @param publicId - The Cloudinary public ID of the asset.
 * @param options  - Optional Cloudinary transformation options.
 */
export function buildCloudinaryUrl(
  publicId: string,
  options: { width?: number; height?: number; quality?: number | "auto"; format?: string } = {}
): string {
  return cloudinary.url(publicId, {
    fetch_format: options.format ?? "auto",
    quality: options.quality ?? "auto",
    width: options.width,
    height: options.height,
    crop: options.width || options.height ? "fill" : undefined,
    gravity: options.width || options.height ? "auto" : undefined,
  });
}
