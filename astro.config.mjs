// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import satteriExternalLinks from "satteri-external-links";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import { mdastReadingTimePlugin } from "@utils/mdast-reading-time";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://cobra.monster",

  // This line fixed the "Failed to scan for dependencies from entries:" error
  base: "",

  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        limitInputPixels: false,
      },
    },
  },

  markdown: {
    shikiConfig: {
      theme: "catppuccin-macchiato",
    },
    processor: satteri({
      features: {
        gfm: {
          footnotes: {
            backContent: "↩",
            backLabel: "Back to reference {reference}",
            label: "Footnotes",
          },
        },
      },
      hastPlugins: [satteriExternalLinks()],
      mdastPlugins: [mdastReadingTimePlugin],
    }),
  },

  integrations: [
    react(),
    sitemap(),
    mdx({
      shikiConfig: { theme: "catppuccin-macchiato" },
    }),
  ],

  redirects: {
    "/books": "/books/default",
    "/home": "/",
    "/rff-swimsuit-zine-2025": "/pdfs/RFF_Zine-Swimsuit_Edition_08-2025.pdf",
    "/feed": "/rss.xml",
    "/rss": "/rss.xml",
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
