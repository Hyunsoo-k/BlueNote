import { useRouter } from "next/router";

import { Post } from "@/types/post";
import { useGetUser } from "@/hooks/auth/useGetUser";
import Thumbnail from "./thumbnail";

import styles from "./index.module.scss";

interface Props {
  postList: Post[];
}

const ThumbnailList = ({ postList }: Props) => {
  const router = useRouter();

  const { data: userMe } = useGetUser();

  const isNoticeOrNewsPage = router.pathname.split("/")[2] === "notice" || router.pathname.split("/")[2] === "news";
  const isMyPage = router.pathname === "/myPage/myPost" ? true : false;
  const mainCategory = router.pathname.split("/").pop();

  return (
    <div className={styles["thumbnail"]}>
      {postList.map((post: Post, index: number) => (
        <Thumbnail post={post} key={index} />
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
