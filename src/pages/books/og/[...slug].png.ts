export const prerender = true;

import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";
import { getCollection } from "astro:content";

import type { ReactElement } from "react";
import { ogHtmlGen } from "src/utils/ogGen";

const blogEntries = await getCollection("books");

interface Props {
  title: string;
  subtitle: string;
  date: Date;
  rating: number;
}

export const GET: APIRoute<Props> = ({ props }) => {
  const ogGenObj = ogHtmlGen(props);
  return new ImageResponse(ogGenObj.markup as ReactElement, ogGenObj.imgResOptions);
};

export async function getStaticPaths() {
  return blogEntries.map((book) => ({
    params: { slug: book.slug },
    props: { title: book.data.title, subtitle: book.data.summary, date: book.data.date, rating: book.data.rating },
  }));
}
