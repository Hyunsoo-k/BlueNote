import { useRouter } from "next/router";

import { PostType } from "@/types/post";
import { useGetUser } from "@/hooks/user/useGetUser";
import DetachedThumbnail from "../detachedThumbnail";

import styles from "./index.module.scss";

interface Props {
  postList: PostType[];
}

const ThumbnailList = ({ postList }: Props) => {
  const router = useRouter();

  const { data: userMe } = useGetUser();

  const isNoticeOrNewsPage = router.pathname.split("/")[2] === "notice" || router.pathname.split("/")[2] === "news";
  const isMyPage = router.pathname === "/myPage/myPost" ? true : false;
  const mainCategory = router.pathname.split("/").pop();

  return (
    <div className={styles["thumbnail-list"]}>
      {postList.map((post: PostType, index: number) => (
        <DetachedThumbnail element={post} key={index} />
      ))}
      {userMe &&
        !isMyPage &&
        (isNoticeOrNewsPage ? (
          userMe.role === 1 && (
            <button
              onClick={() => {
                router.push(`/bbs/${mainCategory}/post/createPost`);
              }}
            >
              글쓰기
            </button>
          )
        ) : (
          <button
            onClick={() => {
              router.push(`/bbs/${mainCategory}/post/createPost`);
            }}
          >
            글쓰기
          </button>
        ))}
    </div>
  );
};

export default ThumbnailList;
