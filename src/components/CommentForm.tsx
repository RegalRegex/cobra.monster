import { useState } from "react";

export const CommentForm = () => {
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [hasSentComment, setHasSentComment] = useState(false);
  const [hasError, setHasError] = useState(false);

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
        console.log("sent!");
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

  return (
    <>
      {hasSentComment && <i>Thank you for your comment!</i>}
      {!hasSentComment && (
        <>
          <form
            id="comment-form"
            name="comment"
            method="POST"
            data-netlify="true"
            netlify-honeypot="url-field"
            onSubmit={handleSubmit}
            className="p-4 border-2 border-yellow flex flex-col"
          >
            <input type="hidden" name="form-name" value="comment" />
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" required={true} className="border border-yellow" />
            </div>
            <div className="hidden">
              <label htmlFor="url-field">URL</label>
              <input type="url" name="url-field" id="url-field" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="comment">Comment</label>
              <textarea name="comment" required={true} className="border border-yellow" />
            </div>
            <div className="flex flex-col">
              <button type="submit" disabled={isSendingForm} className="border border-yellow">
                Send
              </button>
            </div>
          </form>

          {hasError && <i>Comment didn't send.</i>}
        </>
      )}
    </>
  );
};
