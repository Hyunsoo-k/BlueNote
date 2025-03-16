import { ReplyType } from "./reply";

interface CommentType {
  writer: {
    _id: string;
    nickname: string;
    profileImageUrl: string | null;
  };
  content: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  reply: ReplyType[];
  deletedHavingReply: boolean;
};

export type { CommentType };