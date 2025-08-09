/**
 * Image-fetching logic using Astro's glob loader.
 * Currently UNUSED but keeping it in case I need it later.
 *
 * Didn't use it because it only loads images without the ability to load them with captions, alt text, etc.
 *
 * Circumvented this in Collections and @see GalleryGrid
 * Referenced from: {@link https://jankraus.net/2024/04/05/how-to-build-a-simple-photo-gallery-with-astro/}
 */

export async function getGalleryImages(galleryId: string) {
  // 1. List all album files from collections path
  let images = import.meta.glob<{ default: ImageMetadata }>("/src/assets/galleries/**/*.{jpeg,jpg,png}");

  // 2. Filter images by galleryId
  images = Object.fromEntries(Object.entries(images).filter(([key]) => key.includes(galleryId)));

  // 3. Images are promises, so we need to resolve the glob promises
  const resolvedImages = await Promise.all(Object.values(images).map((image) => image().then((mod) => mod.default)));

  // 4. Shuffle images in random order
  resolvedImages.sort(() => Math.random() - 0.5);
  return resolvedImages;
}
