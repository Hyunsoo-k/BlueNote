import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";

import ProfileModal from "@/components/modal/profileModal";

import styles from "./index.module.scss";

interface Props {
  userMe: any;
  viewport: any;
}

const HeaderProfile = ({ userMe, viewport }: Props) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setShowModal(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const targetNode = e.target as Node;
      const notificationIcon = document.getElementById("profileIcon");

      if (!notificationIcon?.contains(targetNode)) {
        setShowModal(false);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div id="profileIcon" onClick={handleShowModal} className={styles["header-profile"]}>
      <Image
        src={userMe.profileImage.url || "/images/user/defaultProfileGray.png"}
        width={viewport === "mobile" ? 23 : 33}
        height={viewport === "mobile" ? 23 : 33}
        alt=""
        style={{ position: "relative", top: viewport === "mobile" ? "3px" : "2px", borderRadius: "50%" }}
      />
      <ProfileModal showModal={showModal} userMe={userMe} />
    </div>
  );
};

export default HeaderProfile;
