import { useRouter } from "next/router";

import { MainCategory } from "@/types/categorys";

import styles from "./index.module.scss";

interface ThumbnailProps {
  mainCategory: MainCategory;
  response: any;
}

const Thumbnail = ({ mainCategory, response }: ThumbnailProps) => {
  const router = useRouter();

  return (
    <div className={styles["thumbnail"]}>
      {response.postList.map((item: any, index: any) => (
        <div
          key={index}
          onClick={() => {
            router.push(`/bbs/${mainCategory}/post/${item._id}`);
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
              <span>{item.subCategory}</span> | {item.createdAt.split("T")[0]}
            </p>
          </div>
          <div className={styles["thumbnail__description"]}>
            <p className={styles["thumbnail__title"]}>{item.title}</p>
            <p className={styles["thumbnail__content"]}>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Thumbnail;
