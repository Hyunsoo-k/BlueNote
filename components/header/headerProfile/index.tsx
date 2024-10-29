import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import ProfileModal from "@/components/modal/profileModal";

import styles from "./index.module.scss";

interface Props {
  userMe: any;
};

const HeaderProfile = ({ userMe }: Props) => {
  const router = useRouter();

  const [modal, setModal] = useState({
    show: false,
    ref: useRef<HTMLDivElement>(null),
  });

  useEffect(() => {
    const handleRouteChange = () => {
      setModal((prev) => ({ ...prev, show: false }));
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        modal.show &&
        modal.ref.current !== e.target as Node &&
        !modal.ref.current?.contains(e.target as Node)
      ) {
        setModal((prev) => ({ ...prev, show: false }));
      };
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal.show]);

  return (
    <div className={styles["header-profile"]}>
      <Image
        onMouseDown={(e: any) => {
          e.stopPropagation();
          setModal((prev) => ({ ...prev, show: !modal.show }));
        }}
        src={userMe.profileImage.url || "/images/user/defaultProfileGray.png"}
        width={37}
        height={37}
        alt=""
        style={{ borderRadius: "50%" }}
      />
      <ProfileModal isShown={modal.show} userMe={userMe} ref={modal.ref} />
    </div>
  );
};

export default HeaderProfile;