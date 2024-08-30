import { useRouter } from "next/router";

import { Post } from "@/types/post";

import styles from "./index.module.scss";

interface Props {
  postList: Post[];
}

const Thumbnail = ({ postList }: Props) => {
  const router = useRouter();

  const mainCategory = router.pathname.split("/").pop();

  return (
    <div className={styles["thumbnail"]}>
      {postList.map((post: Post, index: number) => (
        <div
          key={index}
          onClick={() => {
            router.push(`/bbs/${mainCategory}/post/${post._id}`);
          }}
          className={styles["thumbnail__element"]}
        >
          <div
            className={styles["thumbnail__bg"]}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url("/images/no-image.png")`,
            }}
          >
            <p className={styles["thumbnail__info"]}>
              <span>{post.subCategory}</span> | {post.createdAt.split("T")[0]}
            </p>
          </div>
          <div className={styles["thumbnail__description"]}>
            <p className={styles["thumbnail__title"]}>{post.title}</p>
            <p className={styles["thumbnail__content"]}>{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Thumbnail;
