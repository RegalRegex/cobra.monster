import { z, defineCollection, reference } from "astro:content";

const tags = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
  }),
});

const posts = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      date: z.date(),
      tags: z.array(reference("tags")).optional(),
      blogExclude: z.boolean().optional(),
      emoji: z.preprocess((val) => `/src/assets/mutantEmoji/${val}`, image()).optional(),
    }),
});

const critterBadges = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      url: z.string(),
      alt: z.string(),
      image: image(),
    }),
});

const standardBadges = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      url: z.string().optional(),
      image: image(),
      alt: z.string(),
    }),
});

const books = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      summary: z.string(),
      date: z.date(),
      publishDate: z.number().optional(),
      rating: z.number(),
      cover: z.preprocess((val) => `/src/assets/books/${val}`, image()),
      bookTags: z.array(reference("bookTags")),
    }),
});

const bookTags = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
  }),
});

export const collections = {
  tags,
  posts,
  critterBadges,
  standardBadges,
  books,
  bookTags,
};
