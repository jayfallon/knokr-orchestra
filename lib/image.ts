const CLOUDFRONT_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;

export function getArtistImageUrl(imageUrl: string | null): string | null {
  if (!imageUrl || imageUrl === "a-few-moments-later.png") {
    return null;
  }
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }
  const filename = imageUrl.split(".")[0];
  return `${CLOUDFRONT_URL}/transformed/artists/images/${filename}.webp`;
}
