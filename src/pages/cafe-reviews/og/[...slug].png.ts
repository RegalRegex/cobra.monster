export const prerender = true;

import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";
import { getCollection, type CollectionEntry } from "astro:content";

import type { ReactElement } from "react";
import { ogHtmlGen } from "src/utils/ogGen/ogGen";
import { cafeReviewHtml } from "src/utils/ogGen/ogGenCafeReview";

const reviewEntries = await getCollection("coffeeShopReviews");

interface Props {
  reviewData: CollectionEntry<"coffeeShopReviews">["data"];
}

export const GET: APIRoute<Props> = ({ props }) => {
  const ogGenObj = ogHtmlGen({ template: cafeReviewHtml(props) });
  return new ImageResponse(ogGenObj.markup as ReactElement, ogGenObj.imgResOptions);
};

export async function getStaticPaths() {
  return reviewEntries.map((review) => ({
    params: { slug: review.slug },
    props: { reviewData: review.data },
  }));
}
