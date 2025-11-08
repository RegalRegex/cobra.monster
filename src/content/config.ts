import { z, defineCollection, reference } from "astro:content";

const tags = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
  }),
});

const aboutBlurbs = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      date: z.date(),
      emoji: z.preprocess((val) => `/src/assets/mutantEmoji/${val}`, image()).optional(),
    }),
});

const posts = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      date: z.date(),
      tags: z.array(reference("tags")).optional(),
      headerImg: image(),
      headerImgCaption: z.string().optional(),
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
      cover: image(),
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
              link: z.string().url().optional(),
            })
            .optional(),
          imgAlt: z.string().optional(),
        }),
      ),
    }),
});

const coffeeShopReviews = defineCollection({
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
    }),
});

const comments = defineCollection({
  type: "data",
  schema: z.object({
    comments: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string().nullable(),
        bsky: z.string().nullable(),
        date: z.coerce.date(),
        text: z.string(),
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
