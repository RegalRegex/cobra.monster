import type { GalleryGridItem } from "./GalleryGrid.astro";
import { useState } from "react";
import type { GetImageResult } from "astro";

interface Props {
  gridImage: GetImageResult;
  gridImageDetails: GalleryGridItem;
}

const GalleryGridReact = ({ gridImage, gridImageDetails }: Props) => {
  const [displayDialog, setDisplayDialog] = useState(false);

  const toggleDialog = () => {
    console.log("toggling", displayDialog);
    setDisplayDialog(!displayDialog);
  };

  return (
    <>
      <img
        src={gridImage.src}
        alt={"Grid Item Image"}
        className="mb-4 border border-transparent hover:border-gray-300 transition-all duration-300 ease-in-out hover:shadow-lg lightboxImg hover:cursor-pointer"
        loading="lazy"
        // id={`${gridItem.image.src.split("/").at(-1)}`}
        onClick={toggleDialog}
      />
      {displayDialog && (
        <dialog
          className="fixed w-full h-full left-0 top-0 bg-black/90 backdrop-blur-sm z-50 items-center justify-center flex-col flex"
          //   id={`dialog_${gridItem.image.src.split("/").at(-1)}`}
          onClick={toggleDialog}
        >
          <img
            src={gridImage.src}
            alt="Test"
            className="block mx-auto mt-4 max-w-[90vw] max-h-[90vh] object-contain rounded-sm shadow-lg relative z-20 transition-opacity duration-300 opacity-100"
            loading="lazy"
          />
          <div className=" right-2 text-slate-50 opacity-80 text-xs rounded-full z-50 mt-2 flex flex-col gap-1">
            <p>{gridImageDetails.caption}</p>
            {gridImageDetails.credit?.name !== undefined ? (
              gridImageDetails.credit.link ? (
                <a className="font-bold underline" href={gridImageDetails.credit.link}>
                  @{gridImageDetails.credit.name}
                </a>
              ) : (
                <p>@{gridImageDetails.credit?.name}</p>
              )
            ) : (
              ""
            )}
          </div>
        </dialog>
      )}
    </>
  );
};

export default GalleryGridReact;
