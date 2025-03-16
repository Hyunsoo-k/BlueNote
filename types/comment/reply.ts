interface ReplyType {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    _id: string;
    nickname: string;
    profileImageUrl: string | null;
  }
};

export type { ReplyType };