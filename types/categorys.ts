type MainCategory = "notice" | "news" | "board" | "promote" | "job";

type SubCategory =
  | "All"
  | "notice"
  | "domestic"
  | "overseas"
  | "common"
  | "record"
  | "tip"
  | "bandPromotion"
  | "albumPromotion"
  | "jazzbarPromotion"
  | "jobPosting"
  | "jobSeeking";

export type { MainCategory, SubCategory };
