import type { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";
import type { AstroVNode } from "astro/jsx-runtime";
import { readFileSync } from "fs";
import type { ImageResponseOptions } from "node_modules/@vercel/og/dist/types";
import type { ReactElement } from "react";
import { html } from "satori-html";

interface GetMdxPageOgProps {
  title: string;
  subtitle: string;
  date?: Date;
}

// Logic referenced from: https://rumaan.dev/blog/open-graph-images-using-satori

export const ogHtmlGen = ({ title, subtitle, date }: GetMdxPageOgProps): { markup: AstroVNode; imgResOptions: ImageResponseOptions } => {
  const techHeadlines = readFileSync("./src/assets/og/Tech Headlines.otf");
  const techHeadlinesItalic = readFileSync("./src/assets/og/Tech Headlines Italic.otf");
  const goreRegular = readFileSync("./src/assets/og/Gore Regular.woff");
  const isProd = import.meta.env.PROD;

  const baseUrl = isProd ? "https://cobra.monster/" : "http://localhost:4321/";

  const dateStr = date
    ? `${date.toLocaleDateString("en-US", { day: "numeric" })} ${date.toLocaleDateString("en-US", {
        month: "long",
      })} ${date.toLocaleDateString("en-US", { year: "numeric" })}`
    : "<></>";

  return {
    markup: html(`
    <!-- Container -->
  <div class="w-[1200px] h-[630px] flex">
    <!-- Box -->
    <div class="w-full h-full flex flex-col justify-between bg-[#450a0a] text-red-50">
      <!-- Header, Subtitle, and Image container -->
      <div class="flex w-full justify-between m-10 h-full">
        <!-- Header & Subtitle -->
        <div class="flex flex-col w-[700px] h-[474px] justify-center">
          <h1 class="text-6xl leading-[1.25] border-b-4 border-[#eab308] pb-10">${title}</h1>
          <h2 class="text-3xl leading-[1.5]">${subtitle}</h2>
        </div>
        <!-- Image -->
        <div class="flex max-w-[800px] h-[474px] right-5 bottom-8">
          <img src="${baseUrl}CommieCross-transparent_Batnoise.png" alt="Commie Argent" />
        </div>
      </div>
      <!-- Footer -->
      <footer class="w-full bg-[#7c0404] h-[80px] text-7xl flex items-center px-8 justify-between border-t-4 border-[#7c0404] absolute bottom-0">
        <span class="text-4xl ">
        ${dateStr}
        </span>
        <span class="border-r-2 border-white"> </span>
        <span class="gore ">COBRA.MONSTER</span>
      </footer>
    </div>
  </div>
  <style>
    @font-face {
      font-family: "Tech Headlines";
      src: url("./src/assets/og/Tech Headlines.otf");
    }
    @font-face {
      font-family: "Tech Headlines Italic";
      src: url("./src/assets/og/Tech Headlines Italic.otf");
      style: "italic";
    }
    @font-face {
      font-family: "Gore Regular";
      src: url("./src/assets/og/Gore Regular.woff");
    }
    * {
      font-family: "Tech Headlines";
    }
    .stripedBg {
        background: repeating-linear-gradient(45deg, #450a0a, #450a0a 100px, #340606 100px, #340606 200px);
    }
    h2 {
      font-family: "Tech Headlines Italic";
    }
    .gore {
      font-family: "Gore Regular";
    }
  </style>
    `),
    imgResOptions: {
      fonts: [
        {
          name: "Tech Headlines",
          data: techHeadlines,
          style: "normal",
        },
        {
          name: "Tech Headlines Italic",
          data: techHeadlinesItalic,
          style: "italic",
        },
        {
          name: "Gore Regular",
          data: goreRegular,
          style: "normal",
        },
      ],
    },
  };
};
