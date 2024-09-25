import { MainCtg, SubCtg } from "./categorys"

interface Url {
  path: {
    mainCategory: MainCtg,
    user_id?: string,
    post_id?: string,
    comment_id?: string
  },
  query?: {
    subCategory?: SubCtg,
    page?: string,
    post_id?: string
  },
}

export type { Url };