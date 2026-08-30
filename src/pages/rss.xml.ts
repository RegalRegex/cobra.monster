import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";
import { getCollection, render } from "astro:content";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { sortCollection } from "@utils/sortCollection";

export const GET: APIRoute = async (context) => {
  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });
  const posts = await getCollection("posts");
  const rssPosts = sortCollection(posts, "date");
  // const cafeReview = await getCollection("coffeeShopReviews");
  // const bookReview = await getCollection("books");

  const items = [];
  for (const post of rssPosts) {
    const { Content } = await render(post);
    const content = await container.renderToString(Content);
    const link = new URL(`/blog/${post.id}`, context.url.origin).toString();
    const item = {
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.subtitle,
      link: link,
      content: content,
    };
    items.push(item);
  }
  return rss({
    title: "Regal's Blog",
    description: "A communist cobra's blog posts.",
    site: new URL(`/blog`, context.url.origin).toString(),
    items,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      content: "http://purl.org/rss/1.0/modules/content/",
    },
    customData: [
      `<language>en-us</language>`,
      `<atom:link href="${new URL("/rss.xml", "https://cobra.monster").href}" rel="self" type="application/rss+xml" />`,
    ]
      .filter(Boolean)
      .join(""),
  });
};
