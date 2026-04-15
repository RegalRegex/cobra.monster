// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import tailwindcss from "@tailwindcss/vite";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import embeds from "astro-embed/integration";
import rehypeExternalLinks from "rehype-external-links";
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";

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
    remarkPlugins: [remarkReadingTime],
  },

  integrations: [
    embeds(),
    mdx({
      syntaxHighlight: false,
      rehypePlugins: [
        rehypeSlug,
        [
          rehypePrettyCode,
          {
            theme: "catppuccin-macchiato",
            transformers: [
              transformerCopyButton({
                visibility: "always",
                feedbackDuration: 3_000,
              }),
            ],
          },
        ],
        [
          rehypeExternalLinks,
          {
            properties: {
              className: ["external"],
            },
            rel: [],
          },
        ],
      ],
    }),
    react(),
  ],

  redirects: {
    "/books": "/books/default",
    "/home": "/",
    "/rff-swimsuit-zine-2025": "/pdfs/RFF_Zine-Swimsuit_Edition_08-2025.pdf",
    "/feed": "/rss.xml",
    "/rss": "/rss.xml",
  },

  vite: {
    // @ts-expect-error
    plugins: [tailwindcss()],
  },
});
