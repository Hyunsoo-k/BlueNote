import Image from "next/image";
import { useRouter } from "next/router";
import { forwardRef  } from "react";
import { RiThumbUpLine } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa6";
import { AiOutlineEye } from "react-icons/ai";
import { formatYM } from "@/utils/dateFormatter";

import styles from "./index.module.scss";

interface Props {
  page: any;
  pageIndex: number;
  index: number;
  queryData: any;
  post: any;
};

const RowThumbnail = forwardRef<HTMLDivElement, Props>(({
  page,
  pageIndex,
  index,
  queryData,
  post,
}: Props, ref) => {
  const router = useRouter();

  const handleClickItem = (e: any, mainCategory: string, _id: string) => {
    e.stopPropagation();
    router.push(`/bbs/${mainCategory}/post/${_id}`);
  };

  return (
    <div 
      ref={(pageIndex === queryData?.pages?.length - 1 && index === page?.postList?.length - 1) ? ref : null}
      onClick={(e) => handleClickItem(e, post.mainCategory, post._id)}
      className={styles["container"]}
    >
      <div className={styles["writing-info"]}>
        <span className={styles["writer"]}>{post.writer.nickname}</span>
        <span className={styles["boundary-dot"]}></span>
        <span className={styles["created-at"]}>{formatYM(post.createdAt)}</span>
        <span className={styles["boundary-dot"]}></span>
        <span className={styles["sub-category"]}>{post.subCategory}</span>
      </div>
      {post.thumbnailSrc ? 
        <div className={styles["having-thumbnail-post-main"]}>
          <div className={styles["title-wrapper"]}>
            <p className={styles["title"]}>{post.title}</p>
          </div>
          <div className={styles["content-wrapper"]}>
            <p className={styles["content"]}>{post.content}</p>
          </div>
          <Image
            src={post.thumbnailSrc}
            alt=""
            width={120}
            height={110}
            className={styles["thumbnial"]}
          />
        </div> :
        <div className={styles["not-having-thumbnail-post-main"]}>
          <div className={styles["title-wrapper"]}>
            <p className={styles["title"]}>{post.title}</p>
          </div>
          <div className={styles["content-wrapper"]}>
            <p className={styles["content"]}>{post.content}</p>
          </div>
        </div>
      }
      <div className={styles["post-info-box"]}>
        <div className={styles["views-wrapper"]}>
          <AiOutlineEye
            size={16}
            color="#fff"
          />
          <span className={styles["views"]}>
            {post.views}
          </span>
        </div>
        <div className={styles["comment-wrapper"]}>
          <FaRegCommentDots
              size={15}
              color="#fff"
              style={{ position: "relative", top: "0px" }}
            />
          <span className={styles["comment"]}>
            {post.commentCount}
          </span>
        </div>
        <div className={styles["recommend-wrapper"]}>
          <RiThumbUpLine
            size={15}
            color="#fff"
          />
          <span className={styles["recommend"]}>
            {post.recommend.length}
          </span>
        </div>
      </div>
    </div>
  );
});

RowThumbnail.displayName = "RowThumbnail";

export default RowThumbnail;