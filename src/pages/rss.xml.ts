import rss from "@astrojs/rss";
import type { APIRoute, AstroGlobal } from "astro";
import { getCollection } from "astro:content";
import { sortCollection } from "src/utils/sortCollection";

export const GET: APIRoute = async ({ site }) => {
  const blog = await getCollection("posts");
  const cafeReview = await getCollection("coffeeShopReviews");
  const bookReview = await getCollection("books");

  const blogItems = blog.map((post) => {
    const data = post.data;
    return {
      title: data.title,
      pubDate: data.date,
      description: data.subtitle,
      link: `/blog/${post.slug}`,
      categories: data.tags?.map((tag) => tag.id),
      author: "regal@cobra.monster",
      customData: `<media:image 
      url="${site}api/posts/thumbnails/${post.slug}"
      width="600" 
      height="315" 
      medium="image"/>`,
    };
  });

  const cafeReviewItems = cafeReview.map((review) => {
    const data = review.data;
    return {
      title: `Cafe Review: ${data.title}`,
      pubDate: data.date,
      description: `${Object.values(data.rating).reduce((a, b) => a + b)}/30 | ${data.summary}`,
      link: `/cafe-reviews/${review.slug}`,
      author: "regal@cobra.monster",
    };
  });

  const bookReviewItems = bookReview.map((bookReview) => {
    const data = bookReview.data;
    return {
      title: `Book Review: ${data.title}`,
      pubDate: data.date,
      description: data.summary,
      link: `/books/${bookReview.slug}`,
      author: "regal@cobra.monster",
    };
  });

  const rssItems = [...blogItems].sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());
  // const rssItems = [...blogItems, ...cafeReviewItems, ...bookReviewItems].sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());

  return rss({
    trailingSlash: false,
    stylesheet: "/pretty-feed-v4.xsl",
    title: "Regal's Blog",
    description: "A communist cobra's blog posts.",
    site: site!,
    xmlns: {
      media: "http://search.yahoo.com/mrss/", // media namespace
    },
    // Only blog items, for now
    items: rssItems,
  });
};
