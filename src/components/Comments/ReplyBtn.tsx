import arrowCurve from "@assets/mutantEmoji/utility/arrow_curve_down.png";
import { commentReply } from "./commentReply";

interface ReplyBtnProps {
  commentName: string;
  commentId: string;
}

const ReplyBtn = ({ commentName, commentId }: ReplyBtnProps) => {
  const scrollToForm = () => {
    const formNode = document.getElementById("comment-form-container");
    if (formNode) {
      formNode.scrollIntoView();
    }
  };

  return (
    <button
      onClick={() => {
        commentReply.set({ name: commentName, commentId: commentId });
        scrollToForm();
      }}
      className="replyBtn self-start flex gap-1 text-yellow underline hover:no-underline hover:cursor-pointer"
    >
      Reply
      <img src={arrowCurve.src} className="w-5" />
    </button>
  );
};

export default ReplyBtn;
