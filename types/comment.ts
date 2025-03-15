interface CommentType {
  writer: {
    _id: string;
    nickname: string;
  };
  content: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export type { CommentType };