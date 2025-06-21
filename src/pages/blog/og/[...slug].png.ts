export const prerender = true;

import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";
import { getCollection } from "astro:content";
import { ogHtmlGen } from "src/utils/ogGen";
import type { ReactElement } from "react";

const blogEntries = await getCollection("posts");

interface Props {
  title: string;
  subtitle: string;
  date: Date;
}

export const GET: APIRoute<Props> = ({ props }) => {
  const ogGenObj = ogHtmlGen(props);
  return new ImageResponse(ogGenObj.markup as ReactElement, ogGenObj.imgResOptions);
};

export async function getStaticPaths() {
  return blogEntries
    .filter((entry) => !entry.data.blogExclude)
    .map((post) => ({
      params: { slug: post.slug },
      props: { title: post.data.title, subtitle: post.data.subtitle, date: post.data.date },
    }));
}
