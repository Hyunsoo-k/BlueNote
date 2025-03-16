type MainCategoryType = "notice" | "news" | "board" | "promote" | "job";

type SubCategoryEnglishType  =
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

type SubCategoryKoreanType = 
  | "All"
  | "공지"
  | "국내"
  | "국외"
  | "일반"
  | "녹음"
  | "팁"
  | "밴드홍보"
  | "앨범홍보"
  | "재즈바홍보"
  | "구인"
  | "구직";

export type { MainCategoryType, SubCategoryEnglishType, SubCategoryKoreanType };
