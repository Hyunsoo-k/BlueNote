import HeaderNotification from "../headerNotification";
import HeaderProfile from "../headerProfile";

import styles from "./index.module.scss";

interface Props {
  userMe: any;
  viewport: string;
};

const HeaderUserPanel = ({ userMe, viewport }: Props) => {
  return (
    <div className={styles["container"]}>
      <HeaderNotification userMe_id={userMe._id} viewport={viewport} />
      <div className={styles["boundary-line"]}></div>
      <HeaderProfile userMe={userMe} viewport={viewport} />
    </div>
  );
};

export default HeaderUserPanel;
