export const formatDate = (date: Date) => {
  return date?.toLocaleString("en-US", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" });
};

export const formatTime = (date: Date) => {
  return date?.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });
};

export const capitalizeFirst = (input: string) => {
  if (!input) return input;
  return input[0].toUpperCase() + input.toLowerCase().slice(1);
};

export const upOneLevelUrl = (pathname: string) => {
  const splitUrl: string[] = pathname.split("/");
  const splitUrlTrimmed = splitUrl[splitUrl.length - 1] === "" ? splitUrl.toSpliced(-1) : [...splitUrl];

  return splitUrlTrimmed.toSpliced(-1).join("/");
};
