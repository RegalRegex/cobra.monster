import type { APIRoute } from "astro";
import { getImage } from "astro:assets";
import { getCollection } from "astro:content";

const blogEntries = await getCollection("posts");

export const GET: APIRoute = async ({ params, request }) => {
  const { id } = params;

  if (!id) {
    return new Response("ID is required", {
      status: 400,
    });
  }

  const post = blogEntries.find((p) => p.id === id);

  if (!post) {
    return new Response("Post not found", {
      status: 404,
    });
  }

  const ogImage = await getImage({
    src: post.data.headerImg ?? "/websiteMetaHeader.png",
    width: 600,
    height: 315,
    format: "webp",
  });

  const imageResponse = await fetch(new URL(ogImage.src, request.url));

  const imageBuffer = await imageResponse.arrayBuffer();

  return new Response(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=2592000", // 30 days
    },
  });
};

export async function getStaticPaths() {
  return blogEntries.map((post) => ({
    params: { id: post.id },
    props: { title: post.data.title, subtitle: post.data.subtitle, date: post.data.date },
  }));
}
