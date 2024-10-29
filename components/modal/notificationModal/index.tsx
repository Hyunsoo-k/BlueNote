import { useRouter } from "next/router";
import Image from "next/image";
import { forwardRef } from "react";

import useGetNotification from "@/hooks/auth/useGetNotification";
import { formatLapse } from "@/utils/dateFormatter";

import styles from "./index.module.scss";

interface Props {
  isShown: boolean;
  user_id: string;
};

const NotificationModal = forwardRef<HTMLDivElement, Props>(({ isShown, user_id }, ref) => {
  const router = useRouter();

  const { data } = useGetNotification(user_id);

  if (!isShown) {
    return null;
  };

  return (
    <div ref={ref} className={styles["notification-modal"]}>
      <p className={styles["notification-modal__title"]}>
        새 알림 <span>{data?.newNotificationCount}</span>
      </p>
      <div className={styles["notification-modal__item-wrapper"]}>
        {data?.list?.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => {
              router.push(`/${item.targetUrl}`);
            }}
            className={styles["notification-modal__item"]}
          >
            <Image
              src={item.triggeredBy.profileImage.url}
              width={33}
              height={33}
              alt=""
              style={{ borderRadius: "50%" }}
            />
            {!item.isChecked && <div className={styles["notifiaction-modal__red-light"]}></div>}
            <div className={styles["notification-modal__main"]}>
              <div className={styles["notification-modal__header"]}>
                <p className={styles["notification-modal__triggeredBy"]}>{item.triggeredBy.nickname}</p>
                <p className={styles["notification-modal__lapse"]}>{formatLapse(item.createdAt)}</p>
              </div>
              <p className={styles["notification-modal__content"]}>
                님이 <span>"{item.targetTitle}"</span> 글에 <span>{item.type}</span>을 작성했습니다.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default NotificationModal;
