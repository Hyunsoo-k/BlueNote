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

export { formatYMD, formatYM };