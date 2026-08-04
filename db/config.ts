import { column, defineDb, defineTable, NOW } from "astro:db";

// https://astro.build/db/config

const GuestBook = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    author: column.text(),
    content: column.text(),
    timestamp: column.date({ default: NOW }),
  },
});

export default defineDb({
  tables: { GuestBook },
});
