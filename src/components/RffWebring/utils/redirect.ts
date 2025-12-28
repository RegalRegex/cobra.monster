import webring from "@components/RffWebring/_data/webring.json";

const redirectRffWebring = (isNext: boolean, redirectFrom: string) => {
  const fromId = redirectFrom.split("/")[1];
  const currentIndex = webring.findIndex((i) => i.id === fromId);

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
