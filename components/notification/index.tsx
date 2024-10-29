import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { VscBell } from "react-icons/vsc";

import useGetNotification from "@/hooks/auth/useGetNotification";
import styles from "./index.module.scss";
import NotificationModal from "../modal/notificationModal";

interface Props {
  user_id: string;
}

const Notification = ({ user_id }: Props) => {
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
      if (modal.show
          && modal.ref.current !== (e.target as Node)
          && !modal.ref.current?.contains(e.target as Node)
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

  const { data: notificationData } = useGetNotification(user_id);

  return (
    <div className={styles["notification"]}>
      {notificationData?.newNotificationCount > 0 && <div className={styles["notification__red-light"]}></div>}
      <VscBell
        onMouseDown={(e: any) => {
          e.stopPropagation();
          setModal((prev) => ({ ...prev, show: !modal.show }));
        }}
        size={33}
        color="rgb(120, 120, 120)"
        style={{ position: "relative", top: "2px" }}
      />
      <NotificationModal isShown={modal.show} user_id={user_id} ref={modal.ref} />
    </div>
  );
};

export default Notification;
