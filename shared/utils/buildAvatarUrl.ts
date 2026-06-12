// src/shared/utils/image.ts

export const buildImageUrl = (
  imagePath?: string | null,
  fallback = "/noImage.jpg"
) => {
  if (!imagePath) return fallback;

  // blob preview
  if (imagePath.startsWith("blob:")) {
    return imagePath;
  }

  // already full url
  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://")
  ) {
    return imagePath;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.error("NEXT_PUBLIC_API_URL is missing");
    return fallback;
  }

  return `${baseUrl.replace(/\/$/, "")}/${imagePath.replace(/^\/+/, "")}`;
};
