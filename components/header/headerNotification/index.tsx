import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { VscBell } from "react-icons/vsc";

import useGetNotification from "@/hooks/user/useGetNotification";
import NotificationModal from "@/components/modal/notificationModal";

import styles from "./index.module.scss";

interface Props {
  userMe_id: string;
};

const HeaderNotification = ({ userMe_id }: Props) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setShowModal(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const targetNode = e.target as Node;
      const notificationIcon = document.getElementById("notificationIcon");

      if (
        !notificationIcon?.contains(targetNode)
      ) {
        setShowModal(false);
      };
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { data: notificationData } = useGetNotification(userMe_id);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      id="notificationIcon"
      onMouseDown={handleShowModal}
      className={styles["header-notification"]}
    >
      {notificationData?.newNotificationCount > 0 && <div className={styles["header-notification__red-light"]}></div>}
      <VscBell
        size={33}
        color="rgb(120, 120, 120)"
        style={{ position: "relative", top: "2px" }}
      />
      <NotificationModal notificationData={notificationData} showModal={showModal} userMe_id={userMe_id} />
    </div>
  );
};

export default HeaderNotification;
