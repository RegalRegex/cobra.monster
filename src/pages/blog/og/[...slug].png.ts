export const prerender = true;

import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";
import { getCollection } from "astro:content";

import type { ReactElement } from "react";
import { blogHtml } from "src/utils/ogGen/ogGenBlog";
import { ogHtmlGen } from "src/utils/ogGen/ogGen";

const blogEntries = await getCollection("posts");

interface Props {
  title: string;
  subtitle: string;
  date: Date;
}

export const GET: APIRoute<Props> = ({ props }) => {
  const ogGenObj = ogHtmlGen({ template: blogHtml(props) });
  return new ImageResponse(ogGenObj.markup as ReactElement, ogGenObj.imgResOptions);
};

export async function getStaticPaths() {
  return blogEntries.map((post) => ({
    params: { slug: post.slug },
    props: { title: post.data.title, subtitle: post.data.subtitle, date: post.data.date },
  }));
}
