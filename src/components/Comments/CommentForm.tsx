import { Fragment, useEffect, useState } from "react";
// import { capitalizeFirst } from "src/utils/stringFormatters";
import ArgentWeary from "@assets/mutantEmoji/argent/weary.png";
import exclamation from "@assets/mutantEmoji/utility/red_exclamation_mark.png";
// import markdownit from "markdown-it";

export const CommentForm = () => {
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [hasSentComment, setHasSentComment] = useState(false);
  const [hasError, setHasError] = useState(false);

  // const [commentValue, setCommentValue] = useState("");
  // const [showPreview, setShowPreview] = useState(false);
  // const [mkdownValue, setMkdownValue] = useState("");
  // const md = markdownit();

  useEffect(() => {
    // @ts-ignore
    document.getElementById("comment-form")?.reset();
  }, [hasSentComment]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsSendingForm(true);

    const myForm = event.target;
    const formData = new FormData(myForm);

    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      //   @ts-ignore
      body: new URLSearchParams(formData).toString(),
    })
      .then((data) => {
        if (data.status === 200) {
          setHasSentComment(true);
        } else {
          setHasError(true);
        }
      })
      .catch(() => {
        setHasError(true);
      });
  };

  // const handleCommentChange = (event: any) => {
  //   if (!event) return;
  //   setCommentValue(event.target?.value);
  //   console.log(commentValue);
  // };

  // const handleMkdownToggle = () => {
  //   setMkdownValue(md.render(commentValue));
  //   setShowPreview(!showPreview);
  // };

  return (
    <>
      {hasSentComment && <i>Thanks for your comment! This is a static site, so comments have to be added manually, so give me a bit please :3</i>}
      {!hasSentComment && (
        <>
          <form
            id="comment-form"
            name="comment"
            method="POST"
            data-netlify="true"
            netlify-honeypot="url-field"
            onSubmit={handleSubmit}
            className=" flex flex-col gap-8"
          >
            <input type="hidden" name="form-name" value="comment" />
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg">
                Name *
              </label>
              <input
                type="text"
                name="name"
                required={true}
                className="border border-yellow bg-[#761416] px-2 focus:outline-none  focus:border-slate-200 focus:ring focus:ring-slate-200 placeholder:text-slate-200/55"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="website" className="text-lg">
                Website
              </label>
              <div className="border border-yellow bg-[#761416] flex">
                <input
                  type="text"
                  name="website"
                  required={false}
                  className=" px-2 focus:outline-none  focus:border-slate-200 focus:ring focus:ring-slate-200 placeholder:text-slate-200/55 grow"
                  placeholder="https://cobra.monster"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="bsky" className="text-lg">
                Bluesky (used to link back + fetch your avatar image)
              </label>
              <div className="border border-yellow bg-[#761416] flex">
                <span className="px-2 text-slate-200/75 leading-8">@</span>
                <input
                  type="text"
                  name="bsky"
                  required={false}
                  className=" px-2 focus:outline-none  focus:border-slate-200 focus:ring focus:ring-slate-200 placeholder:text-slate-200/55 border-l border-yellow grow"
                  placeholder="regal.bsky.social"
                />
              </div>
            </div>
            <div className="hidden">
              <label htmlFor="url-field">URL</label>
              <input type="url" name="url-field" id="url-field" />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2 justify-between">
                <label htmlFor="comment" className="text-lg">
                  Comment *
                </label>
                {/* <button className="border-yellow rounded-md p-1 border hover:cursor-pointer" onClick={handleMkdownToggle}>
                  Toggle Preview
                </button> */}
              </div>
              {/* <div dangerouslySetInnerHTML={{ __html: mkdownValue }} className={`${showPreview ? "" : "hidden"}`} /> */}
              <textarea
                name="comment"
                required={true}
                // onChange={handleCommentChange}
                className={`border border-yellow bg-[#761416] px-2 focus:outline-none  focus:border-slate-200 focus:ring focus:ring-slate-200 placeholder:text-slate-200/55 min-h-32`}
              />
            </div>
            <div className="flex flex-col">
              <button
                type="submit"
                disabled={isSendingForm}
                className="border border-yellow hover:cursor-pointer font-bold hover:bg-redDark disabled:text-gray-500"
              >
                Send Comment
              </button>
            </div>
          </form>
          {hasError && (
            <div className="p-8 my-8 text-slate-200  bg-redDark flex flex-col justify-items-center border-yellow border-4 not-prose">
              <div className="flex items-center text-5xl font-[Prospekt_Regular]">
                <img src={exclamation.src} alt="Argent Weary" className="w-20" />
                <img src={ArgentWeary.src} alt="Argent Weary" className="w-20" />
                <p className="ml-4">Whoops! Comment didn't send.</p>
              </div>
              <p className="text-center">This shit's complicated so something is probably broken, sorry.</p>
              <p className="text-center">
                Feel free to{" "}
                <a href="/links#socials" className="text-yellow hover:underline decoration-2">
                  contact me
                </a>{" "}
                about it, if you want!
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};
