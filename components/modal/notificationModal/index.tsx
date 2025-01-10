import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";

import { useCheckNotification } from "@/hooks/user/useCheckNotification";
import { useDeleteNotification } from "@/hooks/user/useDeleteNotification";
import { formatLapse } from "@/utils/dateFormatter";

import styles from "./index.module.scss";

interface Props {
  viewport: string;
  notificationData: any;
  showModal: boolean;
  setShowModal: any;
  userMe_id: string;
};

const NotificationModal = ({
  viewport,
  notificationData,
  showModal,
  setShowModal,
  userMe_id
}: Props) => {
  const router = useRouter();

  const CheckNotificationMutation = useCheckNotification(userMe_id);
  const deleteNotificationMutation = useDeleteNotification(userMe_id);

  const handleClickClose = () => {
    setShowModal(false);
  };

  const handleClickItem = (e: any, notification: any) => {
    e.stopPropagation();
    CheckNotificationMutation.mutate(notification._id);
    router.push(`${notification.postUrl}?element_id=${notification.target_id}`);
  };

  const handleClickDeleteItem = (e: any, notification_id: string) => {
    e.stopPropagation();
    deleteNotificationMutation.mutate(notification_id);
  };

  useEffect(() => {
    if (viewport === "mobile") {
      window.history.pushState(null, "", router.asPath);

      const handlePopState = () => {
        setShowModal(false);
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [viewport, router.asPath, setShowModal]);

  if (!showModal) {
    return null;
  };

  const ModalContent = (
    <div
      onClick={(e: any) => { e.stopPropagation(); }}
      className={styles["container"]}
    >
      <p className={styles["header"]}>
        새 알림 <span>{notificationData?.newNotificationCount}</span>
        <IoCloseOutline
          onClick={handleClickClose}
          style={{ position: "absolute", right: "5px", top: "8px" }}
          size={25}
        />
      </p>
      <div className={styles["notification-box"]}>
        {notificationData?.list?.map((notification: any, index: number) => (
          <div
            key={index}
            onClick={(e: any) => {
              handleClickItem(e, notification);
            }}
            className={styles["notification"]}
          >
            <Image
              src={notification.triggeredBy.profileImage.url || "/images/user/defaultProfileGray.png"}
              width={33}
              height={33}
              alt=""
              style={{
                position: "relative",
                top: "3px",
                borderRadius: "50%",
              }}
            />
            {!notification.isChecked && <div className={styles["notifiaction__red-light"]}></div>}
            <div className={styles["notification__main"]}>
              <div className={styles["notification__header"]}>
                <p className={styles["notification__triggeredBy"]}>
                  {notification.triggeredBy.nickname}
                  <span className={styles["notification__triggeredBy-span"]}>님이</span>
                </p>
                <p className={styles["notification__lapse"]}>{formatLapse(notification.createdAt)}</p>
                <IoCloseOutline
                  onClick={(e: any) => {
                    handleClickDeleteItem(e, notification._id);
                  }}
                  style={{ position: "absolute", right: "0", top: "1px" }}
                  size={19}
                />
              </div>
              {notification.type === "추천"
                ? (
                  <p className={styles["notification__content"]}>
                    <span className={styles["notification__taget-title"]}>
                      {notification.targetTitle}
                    </span>
                    글에&nbsp;
                    <span className={styles["notification__type"]}>{notification.type}</span>
                    을 했습니다.
                  </p>
                  )
                : (
                  <p className={styles["notification__content"]}>
                    <span className={styles["notification__taget-title"]}>
                      {notification.targetTitle}
                    </span>
                    글에&nbsp;
                    <span className={styles["notification__type"]}>{notification.type}</span>
                    을 작성했습니다.
                  </p>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return viewport === "mobile" ? createPortal(ModalContent, document.body) : ModalContent;
};

export default NotificationModal;
