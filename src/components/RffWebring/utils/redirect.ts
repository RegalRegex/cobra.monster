import webring from "@components/RffWebring/_data/webring.json";

const redirectRffWebring = (isNext: boolean, redirectFrom: string) => {
  const fromId = redirectFrom.split("/");
  // Last item in index is always /next or /prev, so 2nd to last should fit formula
  const currentIndex = webring.findIndex((i) => i.id === fromId[fromId.length - 2]);

  if (currentIndex === -1) return "/webring-404";

  let newIndex = currentIndex + (isNext ? 1 : -1);

  if (newIndex > webring.length - 1) {
    newIndex = 0;
  } else if (newIndex < 0) {
    newIndex = webring.length - 1;
  }

  const redirectTo = webring[newIndex].url;
  return redirectTo;
};

export default redirectRffWebring;
