import { useRouter } from "next/router";
import Image from "next/image";
import { LuUser2 } from "react-icons/lu";
import { SlNotebook } from "react-icons/sl";

import { removeCookie } from "@/cookie";

import styles from "./index.module.scss";

const ProfileModal = ({ userMe }: any) => {
  const router = useRouter();

  const logout = () => {
    removeCookie("accessToken");
    location.reload();
  }

  return (
    <div className={styles["profile-modal"]}>
      <div className={styles["profile-modal__header"]}>
        <Image
          width={120}
          height={120}
          src="/images/carousel/playing-trumpet.png"
          alt=""
          style={{ top: "30px", borderRadius: "50%" }}
        />
        <p>{userMe.nickname}<span>님</span></p>
        <p>{userMe.email}</p>
      </div>
      <div className={styles["profile-modal__content"]}>
        <p><LuUser2 size={20} style={{ marginRight: "10px" }} />내 정보</p>
        <p><SlNotebook size={20} style={{ marginRight: "10px" }} />내가 쓴 글</p>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProfileModal;
