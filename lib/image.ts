const CLOUDFRONT_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;

export function getArtistImageUrl(imageUrl: string | null): string | null {
  if (!imageUrl || imageUrl === "a-few-moments-later.png") {
    return null;
  }
  // Only allow CloudFront URLs - external URLs (Wikipedia, etc.) won't work with Next.js Image
  if (imageUrl.startsWith("http")) {
    if (CLOUDFRONT_URL && imageUrl.startsWith(CLOUDFRONT_URL)) {
      return imageUrl;
    }
    // Return null for non-CloudFront URLs to show placeholder instead of broken image
    return null;
  }
  const filename = imageUrl.split(".")[0];
  return `${CLOUDFRONT_URL}/transformed/artists/images/${filename}.webp`;
}
