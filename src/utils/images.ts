import fs from "node:fs/promises";

// Credit: https://github.com/arthelokyo/astrowind/blob/mai@utils/images.ts
// Ref'd from: https://github.com/arthelokyo/astrowind/discussions/528
const load = async function () {
  let images: Record<string, () => Promise<unknown>> | undefined = undefined;
  try {
    images = import.meta.glob("@assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // continue regardless of error
  }
  return images;
};

let _images: Record<string, () => Promise<unknown>> | undefined = undefined;

export const fetchLocalImages = async () => {
  _images = _images || (await load());
  return _images;
};

export const findImage = async (imagePath?: string | ImageMetadata | null): Promise<string | ImageMetadata | undefined | null> => {
  // Not string
  if (typeof imagePath !== "string") {
    return imagePath;
  }

  // Absolute paths
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://") || imagePath.startsWith("/")) {
    return imagePath;
  }

  // Relative paths or not "~/assets/"
  if (!imagePath.startsWith("~/assets/images")) {
    return imagePath;
  }

  const images = await fetchLocalImages();
  const key = imagePath.replace("~/", "/src/");

  return images && typeof images[key] === "function" ? ((await images[key]()) as { default: ImageMetadata })["default"] : null;
};

// Credit: https://mvlanga.com/blog/generating-open-graph-images-in-astro/
export const getFrontmatterImage = async (filePath: string, src: string, format: string) => {
  if (import.meta.env.PROD) {
    const folderPathArr = filePath.split("/");
    folderPathArr.pop();

    const folderPath = folderPathArr.join("/");

    return await fs.readFile(`${process.cwd()}/${folderPath}${src.replace("_astro", "").split(".")[0]}.${format}`);
  }

  return await fs.readFile(src.replace("/@fs", "").replace(/\?.*/, ""));
};
