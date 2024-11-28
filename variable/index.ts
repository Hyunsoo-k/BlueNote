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

const subCategoryUrlMap: { [key: string]: string } = {
  All: 'all',
  공지: 'notice',
  국내: 'domestic',
  국외: 'international',
  일반: 'general',
  녹음: 'recording',
  팁: 'tip',
  밴드홍보: 'band-promotion',
  앨범홍보: 'album-promotion',
  재즈바홍보: 'jazz-bar-promotion',
  구인: 'job-offer',
  구직: 'job-seeker'
};

export { mainCategory, subCategoryListMap, subCategoryMap, subCategoryUrlMap };
