import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, reference } from "astro:content";

const tags = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/tags" }),
  schema: z.object({
    name: z.string(),
  }),
});

const aboutBlurbs = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/aboutBlurbs" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      date: z.date(),
      emoji: z.preprocess((val) => `/src/assets/mutantEmoji/${val}`, image()).optional(),
    }),
});
const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      date: z.date(),
      tags: z.array(reference("tags")).optional(),
      headerImg: image().optional(),
      headerImgCaption: z.string().optional(),
      headerOg: z.boolean().optional(),
    }),
});

const critterBadges = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/critterBadges" }),
  schema: ({ image }) =>
    z.object({
      url: z.string(),
      alt: z.string(),
      image: image(),
    }),
});

const standardBadges = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/standardBadges" }),
  schema: ({ image }) =>
    z.object({
      url: z.string().optional(),
      image: image(),
      alt: z.string(),
    }),
});

const books = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/books" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      summary: z.string(),
      date: z.date(),
      publishDate: z.number().optional(),
      rating: z.number(),
      cover: image(),
      bookTags: z.array(reference("bookTags")),
      ogImgBlurb: z.string().optional(),
    }),
});

const bookTags = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/bookTags" }),
  schema: z.object({
    name: z.string(),
  }),
});

const galleries = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/galleries" }),
  schema: ({ image }) =>
    z.object({
      cover: image(),
      title: z.string(),
      sorting: z.string().optional(),
      description: z.string().optional(),
      images: z.array(
        z.object({
          imgSrc: image(),
          imgCaption: z.string().optional(),
          imgCredit: z
            .object({
              name: z.string(),
              link: z.url().optional(),
            })
            .optional(),
          imgAlt: z.string().optional(),
        }),
      ),
    }),
});

const coffeeShopReviews = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/coffeeShopReviews" }),
  schema: ({ image }) =>
    z.object({
      headerImg: image(),
      headerImgCaption: z.string().optional(),
      title: z.string(),
      location: z.string(),
      rating: z.object({
        coffee: z.number(),
        cafe: z.number(),
        price: z.number(),
        productivity: z.number(),
        vibes: z.number(),
      }),
      favorite: z.boolean(),
      date: z.date(),
      // To separate sorting from info
      lastUpdated: z.date(),
      summary: z.string(),
      orderSuggestion: z.string(),
      scoreOnly: z.boolean().optional(),
      notChicago: z.boolean().optional(),
    }),
});

const comments = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/comments" }),
  schema: z.object({
    comments: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string().nullable().optional(),
        bsky: z.string().nullable().optional(),
        date: z.coerce.date(),
        text: z.string(),
        replyId: z.string().nullable().optional(),
      }),
    ),
  }),
});

export const collections = {
  aboutBlurbs,
  tags,
  posts,
  critterBadges,
  standardBadges,
  books,
  bookTags,
  galleries,
  coffeeShopReviews,
  comments,
};
