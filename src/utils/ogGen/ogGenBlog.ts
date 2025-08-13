import { baseUrl } from "../baseUrl";

interface OgGenBlogProps {
  title: string;
  subtitle: string;
  date?: Date;
}

export const blogHtml = ({ title, subtitle, date }: OgGenBlogProps): string => {
  const isProd = import.meta.env.PROD;
  const dateStr = date
    ? `${date.toLocaleDateString("en-US", { day: "numeric", timeZone: "UTC" })} ${date.toLocaleDateString("en-US", {
        month: "long",
        timeZone: "UTC",
      })} ${date.toLocaleDateString("en-US", { year: "numeric", timeZone: "UTC" })}`
    : "<></>";

  return `
    <!-- Container -->
  <div class="w-[1200px] h-[630px] flex">
    <!-- Box -->
    <div class="w-full h-full flex flex-col justify-between bg-[#450a0a] text-red-50">
    <!-- Info Badge Top Left -->
    <div class="absolute flex -top-8 text-xl "><h2 class="bg-[#7c0404] border-b-4 border-[#eab308] pl-1 pr-5 pt-3">${"Blog Post"}</h2></div>
      <!-- Header, Subtitle, and Image container -->
      <div class="flex w-full justify-between m-10 h-full"> 
        <!-- Header & Subtitle -->
        <div class="flex flex-col w-[700px] h-[474px] justify-center pt-5">
          <h1 class="${title.length > 30 ? "text-5xl" : "text-6xl"} leading-[1.25] border-b-4 border-[#eab308] pb-10">${title}</h1>
          <div class="flex flex-col justify-around grow">
            <h2 class="${subtitle.length > 120 ? "text-2xl" : "text-3xl"} leading-[1.5]">${subtitle}</h2>
          </div>
        </div>
        <!-- Image -->
        <div class="flex max-w-[800px] h-[474px] right-5 bottom-8">
          <img src="${baseUrl()}CommieCross-transparent_Batnoise.png" alt="Commie Argent" />
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
