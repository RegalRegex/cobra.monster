import { useRef, useState, type ReactNode } from "react";
import arrowRight from "@assets/mutantEmoji/utility/arrow_right.png";

/**
 * Simple React accordion component
 *
 * @remarks
 * Created to allow for individual state without resorting to scripts, especially in use within MDX files.
 * Title and Content params are inserted in MDX context via slots, but can be inserted as direct props if desired.
 *
 * @param {ReactNode} title - Title content
 *
 * Code largely inspired by Bionic Julia: {@link https://bionicjulia.com/blog/creating-accordion-component-react-typescript-tailwind}
 * @example
 *
 * ```mdx
 * <Accordion client:idle>
 * <span slot="title"><span className="text-yellow mr-1">1.</span> Pour Overs</span>
 * <div slot="content">
 * Specifically a ceramic V60 or Origami dripper. There are a lot of great pour-over cones, but these two have been the best for me personally.
 * </div>
 * </Accordion>
 * ```
 *
 * @see AccordionPhotoTemplate.astro
 *
 */

interface Props {
  title: ReactNode;
  content: ReactNode;
}

const Accordion = ({ title, content }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState("0px");
  const [rotate, setRotate] = useState("transform duration-700 ease");

  const contentSpace = useRef(null);

  function toggleAccordion() {
    setExpanded((prevState) => !prevState);
    // @ts-ignore
    setHeight(expanded ? "0px" : `${contentSpace.current.scrollHeight}px`);
    setRotate(expanded ? "transform duration-500 ease" : "transform duration-500 ease rotate-90");
  }

  return (
    <div className="@container/accordion accordion flex flex-col my-5 border-l-8 border-yellow">
      {
        <div className="bg-redDark/40 p-4 ">
          <h3 className="font-bold not-prose">
            <button className="accordionBtn flex items-center justify-between w-full hover:cursor-pointer" onClick={toggleAccordion} aria-expanded={expanded}>
              {title}
              <img className={`${rotate} w-6`} src={arrowRight.src} alt="arrow" />
            </button>
          </h3>
          <section ref={contentSpace} style={{ maxHeight: `${height}` }} className="overflow-y-hidden transition-max-height duration-500 ease-in-out text-left">
            {content}
          </section>
        </div>
      }
    </div>
  );
};

export default Accordion;
