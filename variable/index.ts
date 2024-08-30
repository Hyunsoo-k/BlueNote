const mainCategory = [
  { main: "notice", label: "Notice" },
  { main: "news", label: "News" },
  { main: "board", label: "Board" },
  { main: "promote", label: "Promote" },
  { main: "job", label: "Job" },
];

const subCategoryListMap = {
  notice: ["공지", "All"],
  news: ["국내", "국외", "All"],
  board: ["일반", "녹음", "팁", "All"],
  promote: ["밴드홍보", "앨범홍보", "재즈바홍보", "All"],
  job: ["구인", "구직", "All"],
};

const subCategoryMap = {
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
  jobSeeking: "구직"

}

const subCategoryUrlMap = {
  All: "All",
  공지: "notification",
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

export { mainCategory, subCategoryListMap, subCategoryMap, subCategoryUrlMap };
