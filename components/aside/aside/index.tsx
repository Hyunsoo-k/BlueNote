import PhotoNews from "../photoNews";
import RecommendedNews from "../recommendedNews";

import styles from "./index.module.scss";

const Aside = () => {
  return (
    <div className={styles["compoenent"]}>
      <PhotoNews />
      <RecommendedNews />
    </div>
  );
};

export default Aside;