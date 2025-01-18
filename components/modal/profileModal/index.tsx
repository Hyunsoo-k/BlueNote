import { useRouter } from "next/router";
import Image from "next/image";
import { LuUser2 } from "react-icons/lu";
import { IoDocumentOutline } from "react-icons/io5";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";

import { useRemoveCookie } from "@/cookie";

import styles from "./index.module.scss";

interface Props {
  showModal: boolean;
  userMe: any;
}

const ProfileModal = ({ showModal, userMe }: Props) => {
  const router = useRouter();

  const logoutFn = useRemoveCookie("accessToken");

  const logout = () => {
    logoutFn();
    window.localStorage.removeItem("userMe");
    window.location.replace("/");
  };

  if (!showModal) {
    return null;
  }

  return (
    <div
      onClick={(e: any) => {
        e.stopPropagation();
      }}
      className={styles["profile-modal"]}
    >
      <div className={styles["profile-modal__header"]}>
        <Image
          src={userMe.profileImage.url || "/images/user/defaultProfileGray.png"}
          width={120}
          height={120}
          alt=""
          style={{ top: "30px", borderRadius: "50%" }}
        />
        <p>
          {userMe.nickname}
          <span>님</span>
        </p>
        <p>{userMe.email}</p>
      </div>
      <ul className={styles["profile-modal__content"]}>
        <li onClick={() => router.push("/myPage/user")}>
          <LuUser2 size={20} style={{ marginRight: "10px" }} />내 정보
        </li>
        <li onClick={() => router.push("/myPage/myPost")}>
          <IoDocumentOutline size={20} style={{ marginRight: "10px" }} />
          내가 쓴 글
        </li>
        <li onClick={() => router.push("/myPage/schedule")}>
          <IoCalendarNumberOutline size={20} style={{ marginRight: "10px" }} />내 일정
        </li>
        <li onClick={logout}>
          <RiLogoutBoxLine size={20} style={{ marginRight: "10px" }} />
          로그아웃
        </li>
      </ul>
    </div>
  );
};

export default ProfileModal;
