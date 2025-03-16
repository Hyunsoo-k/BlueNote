interface LoggedInUserMe {
  _id: string;
  email: string;
  nickname: string;
  part: string | null;
  profileImageUrl: string;
  role: number;
};

type UserMeType = LoggedInUserMe | undefined;

export type { UserMeType };