import { SubCategoryKoreanType } from "@/types/category/categorys";

const mainCategory = [
  { main: "notice", label: "NOTICE" },
  { main: "news", label: "NEWS" },
  { main: "board", label: "BOARD" },
  { main: "promote", label: "PROMOTE" },
  { main: "job", label: "JOB" },
];

const subCategoryListMap: Record<"notice" | "news" | "board" | "promote" | "job", SubCategoryKoreanType[]> = {
  notice: ["공지", "All"],
  news: ["국내", "국외", "All"],
  board: ["일반", "녹음", "팁", "All"],
  promote: ["밴드홍보", "앨범홍보", "재즈바홍보", "All"],
  job: ["구인", "구직", "All"],
};

const subCategoryEnglishToKoreanMap: { [key: string]: string } = {
  All: "All",
  notification: "공지",
  domestic: "국내",
  overseas: "국외",
  common: "일반",
  record: "녹음",
  tip: "팁",
  bandPromotion: "밴드홍보",
  albumPromotion: "앨범홍보",
  jazzbarPromotion: "재즈바홍보",
  jobPosting: "구인",
  jobSeeking: "구직",
};

const subCategoryKoreanToEnglishMap: { [key: string]: string } = {
  All: "All",
  공지: "notice",
  국내: "domestic",
  국외: "overseas",
  일반: "common",
  녹음: "record",
  팁: "tip",
  밴드홍보: "bandPromotion",
  앨범홍보: "albumPromotion",
  재즈바홍보: "jazzbarPromotion",
  구인: "jobPosting",
  구직: "jobSeeking",
};

export { mainCategory, subCategoryListMap, subCategoryEnglishToKoreanMap, subCategoryKoreanToEnglishMap };
