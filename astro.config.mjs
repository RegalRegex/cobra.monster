// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import tailwindcss from "@tailwindcss/vite";
import { transformerCopyButton } from "@rehype-pretty/transformers";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://localhost:4321",
  // This line fixed the "Failed to scan for dependencies from entries:" error
  base: "",
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        limitInputPixels: false,
      },
    },
  },
  integrations: [
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
      ],
    }),
    react(),
  ],
  redirects: {
    "/books": "/books/default",
    "/home": "/",
    "/rff-swimsuit-zine-2025": "/pdfs/RFF_Zine-Swimsuit_Edition_08-2025.pdf",
    "/feed": "/rss.xml",
  },
});
