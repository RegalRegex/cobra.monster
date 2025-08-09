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

const galleries = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      // Assume png, but otherwise include as array
      // Example: "Argent" for .png vs. ["Argent", "jpeg"] for .jpeg
      cover: z.preprocess((val) => {
        if (Array.isArray(val)) {
          return `/src/assets/galleries/${val[0]}/cover.${val[1]}`;
        } else {
          return `/src/assets/galleries/${val}/cover.png`;
        }
      }, image()),
      title: z.string(),
      sorting: z.string().optional(),
      description: z.string().optional(),
      images: z.array(
        z.object({
          // preprocess?
          imgSrc: image(),
          imgCaption: z.string().optional(),
          imgCredit: z
            .object({
              name: z.string(),
              link: z.string().url().optional(),
            })
            .optional(),
          imgAlt: z.string().optional(),
        }),
      ),
    }),
});

export const collections = {
  tags,
  posts,
  critterBadges,
  standardBadges,
  books,
  bookTags,
  galleries,
};
