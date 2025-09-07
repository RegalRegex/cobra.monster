import { db, Comment } from "astro:db";

export default async function seed() {
  await db.insert(Comment).values([
    {
      postSlug: "2025-04-03_i-made-a-website",
      name: "Jamie",
      email: "jamie@turso.tech",
      message: "Great post!",
      bsky: "test",
      createdAt: new Date(),
    },
    {
      postSlug: "2025-04-03_i-made-a-website",
      name: "Jamie",
      email: "jamie@turso.tech",
      message: "Another great post!",
      bsky: "test",
      createdAt: new Date(),
    },
  ]);
}
