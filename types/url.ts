import { MainCategory, SubCategory } from "./categorys"

interface Url {
  path: {
    mainCategory: MainCategory,
    user_id?: string,
    post_id?: string,
    comment_id?: string
  },
  query?: {
    subCategory?: SubCategory,
    page?: string,
    post_id?: string
  },
}

export type { Url };