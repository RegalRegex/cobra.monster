import { atom } from "nanostores";

// For storing the parent comment that a reply is replying to
export const commentReply = atom({ name: "", commentId: "" });
