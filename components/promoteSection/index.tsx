import { useEffect } from "react";

import Thumbnail from "../thumbnailList/thumbnail";

import styles from "./index.module.scss";

interface Props {
  postList: any;
}

const PromoteSection = ({ postList }: Props) => {

  return <div className={styles["promote-seciotn"]}>
    <p className={styles["promote-section__title"]}>Promote</p>
    <div className={styles["promote-section__main"]}>
      {postList.map((post: any, index: number) => <Thumbnail post={post} key={index} />)}
    </div>
  </div>;
};

export default PromoteSection;
