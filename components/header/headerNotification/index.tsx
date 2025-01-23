import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { VscBell } from "react-icons/vsc";

import useGetNotification from "@/hooks/user/useGetNotification";
import NotificationModal from "@/components/modal/notificationModal";

import styles from "./index.module.scss";

interface Props {
  userMe_id: string;
  viewport: any;
};

const HeaderNotification = ({ userMe_id, viewport }: Props) => {
  const router = useRouter();

  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setOpenModal(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const targetNode = e.target as Node;
      const notificationIcon = document.getElementById("notificationIcon");

      if (!notificationIcon?.contains(targetNode)) {
        setOpenModal(false);
      };
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    viewport !== "mobile" && window.addEventListener("click", handleClickOutside);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      viewport !== "mobile" && window.removeEventListener("click", handleClickOutside);
    };
  }, [viewport]);

  const { data: notificationData } = useGetNotification(userMe_id);

  const handleShowModal = () => {
    setOpenModal(!openModal);
    console.log("handleShowModal done")
  };

  return (
    <div
      id="notificationIcon"
      onClick={handleShowModal}
      className={styles["container"]}
    >
      {notificationData?.newNotificationCount > 0 && <div className={styles["red-light"]}></div>}
      <VscBell
        size={viewport === "mobile" ? 23 : 33}
        color="#2C2C2C"
        style={{
          position: "relative",
          top: viewport === "mobile" ? "3px" : "2px",
          right: "-2px"
        }}
      />
      <NotificationModal
        viewport={viewport}
        notificationData={notificationData}
        openModal={openModal}
        setOpenModal={setOpenModal}
        userMe_id={userMe_id}
      />
    </div>
  );
};

export default HeaderNotification;
