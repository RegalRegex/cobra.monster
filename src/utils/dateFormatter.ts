export const formatDate = (date: Date) => {
  return date?.toLocaleString("en-US", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" });
};
