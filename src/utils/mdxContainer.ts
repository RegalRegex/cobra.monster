import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";

let mdxContainer = null;

async function getMdxContainer() {
  if (!mdxContainer) {
    const renderers = await loadRenderers([getMDXRenderer()]);
    mdxContainer = await AstroContainer.create({ renderers });
  }
  return mdxContainer;
}
