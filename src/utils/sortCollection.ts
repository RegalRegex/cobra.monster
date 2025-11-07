import type { CollectionEntry } from "astro:content";

export function sortCollection<T extends CollectionEntry<"posts" | "books" | "coffeeShopReviews" | "aboutBlurbs">>(
  list: Array<T>,
  sortType: "date" | "title" | "rating",
): Array<T> {
  let sortedResult: T[] = [];
  switch (sortType) {
    case "date":
      return (sortedResult = list.sort((a, b) => {
        return new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf();
      }));
    case "title":
      return (sortedResult = list.sort((a, b) => {
        return a.data.title.localeCompare(b.data.title);
      }));
    case "rating":
      return (sortedResult = list
        .sort((a, b) => {
          if ("rating" in a.data && "rating" in b.data) {
            return Object.values(a.data.rating).reduce((a, b) => a + b) - Object.values(b.data.rating).reduce((a, b) => a + b);
          } else {
            return 0;
          }
        })
        .toReversed());
    default:
      break;
  }
  return sortedResult;
}
