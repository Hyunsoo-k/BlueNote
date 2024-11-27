const formatYMD = (d: string) => {
  const date = d.split("T")[0];
  const time = d.split("T")[1].split(":").slice(0, 2).join(":");

  return `${date} ${time}`
}

const formatYM = (d: string) => {
  const date = new Date(d);
  const [fullDate] = date.toISOString().split("T");
  const koreaTime = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  });

  return new Date().toDateString() === date.toDateString() ? koreaTime : fullDate.slice(5).replace(/-/g, ".");
};

const formatLapse = (d: string) => {
  const now = new Date();
  const targetDate = new Date(d);
  
  const diff = now.getTime() - targetDate.getTime();

  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else if (diffDays < 30) {
    return `${diffDays}일 전`;
  } else if (diffMonths < 12) {
    return `${diffMonths}달 전`;
  } else {
    return `${diffYears}년 전`;
  }
};

export { formatYMD, formatYM, formatLapse };