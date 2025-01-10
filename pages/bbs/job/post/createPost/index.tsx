import { useContext } from "react";

import { ViewportContext } from "@/contexts/viewport";
import CreatePost from "@/components/bbs/createPost";

import styles from "./index.module.scss";


const JobCreatePostPage = () => {
  const viewportContext = useContext(ViewportContext);
  const viewport = viewportContext?.viewport || "mobile";


  return (
    <div className={styles["container"]}>
      <CreatePost mainCategory="job" viewport={viewport} />
    </div>
  );
};

export default JobCreatePostPage;
