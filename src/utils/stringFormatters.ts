export const formatDate = (date: Date) => {
  return date?.toLocaleString("en-US", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" });
};

export const capitalizeFirst = (input: string) => {
  if (!input) return input;
  return input[0].toUpperCase() + input.slice(1);
};
