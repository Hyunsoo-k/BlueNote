import { useRouter } from "next/router";
import { LuUser2 } from "react-icons/lu";
import { IoDocumentOutline } from "react-icons/io5";
import { IoCalendarNumberOutline } from "react-icons/io5";

import styles from "./index.module.scss";

interface Props {
  currentPage?: string;
}

const MyPageMenu = ({ currentPage }: Props) => {
  const router = useRouter();

  const navigate = (destination: string) => {
    router.push(`/myPage/${destination}`)
  };

  return (
    <div className={styles["my-page-menu"]}>
      <p className={styles["my-page-menu__title"]}>My Page</p>
      <p onClick={() => navigate("user")}><LuUser2 size={25} style={{ marginRight: "10px" }} />내 정보</p>
      <p onClick={() => navigate("myPost")}><IoDocumentOutline size={25} style={{ marginRight: "10px" }} />내가 쓴 글</p>
      <p onClick={() => navigate("schedule")}><IoCalendarNumberOutline size={25} style={{ marginRight: "10px" }} />내 일정</p>
    </div>
  )
};

export default MyPageMenu;