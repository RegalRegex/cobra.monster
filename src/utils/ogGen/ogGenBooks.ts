interface OgGenBlogProps {
  title: string;
  subtitle: string;
  date?: Date;
  rating: number;
  cover: string;
}
// FIXME: Env Var not reading in test-branch
export const booksHtml = ({ title, subtitle, date, rating, cover }: OgGenBlogProps): string => {
  const isProd = import.meta.env.PROD;
  const isTest = import.meta.env.DEV;
  const baseUrl = () => {
    if (isProd) {
      return "https://cobra.monster/";
    } else if (isTest) {
      return "https://test-branch.cobra.monster/";
    } else {
      return "http://localhost:4321/";
    }
  };

  const dateStr = date
    ? `${date.toLocaleDateString("en-US", { day: "numeric" })} ${date.toLocaleDateString("en-US", {
        month: "long",
      })} ${date.toLocaleDateString("en-US", { year: "numeric" })}`
    : "<></>";

  const starRatingBuilder = (): string => {
    if (rating) {
      const starSize: number = 60;
      const emptyCalc = 4 - Math.floor(rating);
      return `${[...Array(Math.floor(rating))]
        .map(
          () => `<img src="${baseUrl()}/CHISTAR(yellow).png" alt={"Chicago Star"} width="${starSize}px" height="${starSize}px" className="aspect-square " />`,
        )
        .concat()
        .join("")} ${
        rating % 1 !== 0
          ? `<img src="${baseUrl()}/CHISTAR(yellow)_half-full.png" width="${starSize}px" height="${starSize}px" alt={"Half of a Chicago Star"} className="aspect-square " />`
          : ""
      } 
      ${
        emptyCalc > 0
          ? [...Array(emptyCalc)]
              .map(
                () =>
                  `<img src="${baseUrl()}/CHISTAR(yellow)(outline).png" alt={"Chicago Star"} width="${starSize}px" height="${starSize}px" className="aspect-square " />`,
              )
              .concat()
              .join("")
          : ""
      }`;
    }
    return "";
  };

  return `
    <!-- Container -->
  <div class="w-[1200px] h-[630px] flex">
    <!-- Box -->
    <div class="w-full h-full flex flex-col justify-between bg-[#450a0a] text-red-50">
    <!-- Info Badge Top Left -->
    <div class="absolute flex -top-8 text-xl "><h2 class="bg-[#7c0404] border-b-4 border-[#eab308] pl-1 pr-5 pt-3">${
      rating ? "Book Review" : "Blog Post"
    }</h2></div>
      <!-- Header, Subtitle, and Image container -->
      <div class="flex w-full justify-between m-10 h-full"> 
        <!-- Header & Subtitle -->
        <div class="flex flex-col w-[700px] h-[474px] justify-center pt-5">
          <h1 class="${title.length > 30 ? "text-5xl" : "text-6xl"} leading-[1.25] border-b-4 border-[#eab308] pb-10">${title}</h1>
          <div class="flex flex-col justify-around grow">
            <h2 class="${subtitle.length > 120 ? "text-2xl" : "text-3xl"} leading-[1.5]">${subtitle}</h2>
            <span>${starRatingBuilder()}</span>
          </div>
        </div>
        <!-- Image -->
        <div class="flex right-10 bottom-10 mb-[80px] justify-end items-end max-w-[350px] h-[550px]">
          <img src="${baseUrl()}books/${cover}" />
        </div>
      </div>
      <!-- Footer -->
      <footer class="w-full bg-[#7c0404] h-[80px] text-7xl flex items-center px-8 justify-between border-t-4 border-[#7c0404] absolute bottom-0">
        <span class="text-4xl ">
        ${dateStr}
        </span>
        <span class="border-r-2 border-white"> </span>
        <span class="gore ">COBRA.MONSTER</span>
      </footer>
    </div>
  </div>
  <style>
    @font-face {
      font-family: "Tech Headlines";
      src: url("./src/assets/og/Tech Headlines.otf");
    }
    @font-face {
      font-family: "Tech Headlines Italic";
      src: url("./src/assets/og/Tech Headlines Italic.otf");
      style: "italic";
    }
    @font-face {
      font-family: "Gore Regular";
      src: url("./src/assets/og/Gore Regular.woff");
    }
    * {
      font-family: "Tech Headlines";
    }
    .stripedBg {
        background: repeating-linear-gradient(45deg, #450a0a, #450a0a 100px, #340606 100px, #340606 200px);
    }
    h2 {
      font-family: "Tech Headlines Italic";
    }
    .gore {
      font-family: "Gore Regular";
    }
  </style>
    `;
};
