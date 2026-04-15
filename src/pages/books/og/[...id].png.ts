export const prerender = true;

import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";
import { getCollection } from "astro:content";

import type { ReactElement } from "react";
import { ogHtmlGen } from "@utils/ogGen/ogGen";
import { booksHtml } from "@utils/ogGen/ogGenBooks";

const blogEntries = await getCollection("books");

interface Props {
  title: string;
  author: string;
  subtitle: string;
  date: Date;
  rating: number;
  cover: string;
}

export const GET: APIRoute<Props> = ({ props }) => {
  const ogGenObj = ogHtmlGen({ template: booksHtml(props) });
  return new ImageResponse(ogGenObj.markup as ReactElement, ogGenObj.imgResOptions);
};

export async function getStaticPaths() {
  return blogEntries.map((book) => {
    const constructPublicPath = () => {
      const fileType = book.data.cover.src.split(".").pop();
      const coverPath = `${book.data.cover.src.split("/").pop()?.split("?").shift()?.split(".")[0]}.${fileType}`;
      return coverPath;
    };
    return {
      params: { id: book.id },
      props: {
        title: book.data.title,
        author: book.data.author,
        subtitle: book.data.summary,
        date: book.data.date,
        rating: book.data.rating,
        cover: constructPublicPath(),
        ogImgBlurb: book.data.ogImgBlurb,
      },
    };
  });
}
