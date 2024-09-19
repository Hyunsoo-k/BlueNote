import { useRouter } from "next/router";
import Image from "next/image";
import { LuUser2 } from "react-icons/lu";
import { IoDocumentOutline } from "react-icons/io5";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";

import { removeCookie } from "@/cookie";

import styles from "./index.module.scss";

interface Props {
  userMe: any;
}

const ProfileModal = ({ userMe }: Props) => {
  const router = useRouter();

  const logout = () => {
    removeCookie("accessToken");
    window.location.replace("/");
  }

  return (
    <div className={styles["profile-modal"]}>
      <div className={styles["profile-modal__header"]}>
        <Image
          width={120}
          height={120}
          src={userMe.profileImage.url || "/images/user/default-profile.png"}
          alt=""
          style={{ top: "30px", borderRadius: "50%" }}
        />
        <p>{userMe.nickname}<span>님</span></p>
        <p>{userMe.email}</p>
      </div>
      <div className={styles["profile-modal__content"]}>
        <p onClick={() => router.push("/myPage/user")}><LuUser2 size={20} style={{ marginRight: "10px" }} />내 정보</p>
        <p onClick={() => router.push("/myPage/myPost")}><IoDocumentOutline size={20} style={{ marginRight: "10px" }} />내가 쓴 글</p>
        <p onClick={() => router.push("/myPage/schedule")}><IoCalendarNumberOutline size={20} style={{ marginRight: "10px" }} />내 일정</p>
        <p onClick={logout}><RiLogoutBoxLine size={20} style={{ marginRight: "10px" }} />로그아웃</p>
      </div>
    </div>
  );
};

export default ProfileModal;
