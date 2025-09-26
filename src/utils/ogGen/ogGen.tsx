import { readFileSync } from "fs";
import type { ImageResponseOptions } from "node_modules/@vercel/og/dist/types";
import type { ReactNode } from "react";
import { html } from "satori-html";

interface OgHtmlGenProps {
  template: string;
}

// Logic referenced from: https://rumaan.dev/blog/open-graph-images-using-satori

export const ogHtmlGen = ({ template }: OgHtmlGenProps): { markup: ReactNode; imgResOptions: ImageResponseOptions } => {
  const techHeadlines = readFileSync("./src/assets/og/Tech Headlines.otf");
  const techHeadlinesItalic = readFileSync("./src/assets/og/Tech Headlines Italic.otf");
  const goreRegular = readFileSync("./src/assets/og/Gore Regular.woff");

  return {
    markup: html(template) as ReactNode,
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
