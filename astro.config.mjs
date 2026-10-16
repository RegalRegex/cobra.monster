// @ts-check
import { defineConfig, fontProviders } from "astro/config";
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
  fonts: [
    {
      provider: fontProviders.local(),
      name: "MarsAttack",
      cssVariable: "--font-mars-attack",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/MarsAttack.otf"],
            weight: "normal",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Gore",
      cssVariable: "--font-gore",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Gore Regular.woff"],
            weight: "normal",
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Roboto",
      cssVariable: "--font-roboto",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Roboto.ttf"],
            weight: "100 900",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Prospekt",
      cssVariable: "--font-prospekt",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Prospekt Regular.otf"],
            weight: "normal",
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Big Shoulders",
      cssVariable: "--font-big-shoulders",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/BigShoulders.ttf"],
            weight: "100 900",
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Snake Chan",
      cssVariable: "--font-snake-chan",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Snake Chan.otf"],
            weight: "normal",
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Eternal",
      cssVariable: "--font-eternal",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Eternal.otf"],
            weight: "normal",
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
  ],
});
