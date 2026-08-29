import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection, render } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

export const GET: APIRoute = async ({ site }) => {
  const blog = await getCollection("posts");
  const cafeReview = await getCollection("coffeeShopReviews");
  const bookReview = await getCollection("books");

  const parser = new MarkdownIt();

  const absoluteUrls = (html: string) => html.replace(/(href|src)="\/(?!\/)/g, `$1="https://cobra.monster`);

  const blogItems = await Promise.all(
    blog.map(async (post) => {
      const { data, id } = post;
      const rendered = await render(post);
      const html = typeof rendered === "string" ? rendered : ((rendered as any).html ?? "");
      return {
        title: data.title,
        pubDate: data.date,
        description: data.subtitle,
        link: `/blog/${id}`,
        content: html,
        categories: data.tags?.map((tag) => tag.id),
        author: "regal@cobra.monster",
        customData: `<media:image 
      url="${site}api/posts/thumbnails/${id}"
      width="600" 
      height="315" 
      medium="image"/>`,
      };
    }),
  );

  const cafeReviewItems = cafeReview.map((review) => {
    const data = review.data;
    return {
      title: `Cafe Review: ${data.title}`,
      pubDate: data.date,
      description: `${Object.values(data.rating).reduce((a, b) => a + b)}/30 | ${data.summary}`,
      link: `/cafe-reviews/${review.id}`,
      author: "regal@cobra.monster",
    };
  });

  const bookReviewItems = bookReview.map((bookReview) => {
    const data = bookReview.data;
    return {
      title: `Book Review: ${data.title}`,
      pubDate: data.date,
      description: data.summary,
      link: `/books/${bookReview.id}`,
      author: "regal@cobra.monster",
    };
  });

  const rssItems = await [...blogItems].sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());
  // const rssItems = [...blogItems, ...cafeReviewItems, ...bookReviewItems].sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());

  // return rss({
  //   trailingSlash: false,
  // stylesheet: "/pretty-feed-v4.xsl",
  //   title: "Regal's Blog",
  //   description: "A communist cobra's blog posts.",
  //   site: site!,
  //   xmlns: {
  //     atom: "http://www.w3.org/2005/Atom",
  //     content: "http://purl.org/rss/1.0/modules/content/",
  //   },
  //   // Only blog items, for now
  //   items: blogItems,
  // });
  return rss({
    title: "Regal's Blog",
    description: "A communist cobra's blog posts.",
    // stylesheet: "/pretty-feed-v4.xsl",
    site: site!,
    items: blog.map((post) => ({
      link: `/blog/${post.id}`,
      content: sanitizeHtml(parser.render(post.body!), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
      ...post.data,
    })),
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
