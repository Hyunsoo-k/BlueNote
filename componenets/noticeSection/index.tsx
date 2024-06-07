import { LuMegaphone } from "react-icons/lu";

import { NoticeSectionProps } from "@/types/noticeSection";
import { dummyNoticeSectionData } from "@/dummy-data/noticeSection";
import styles from "./index.module.scss";

const NoticeSection = ({ viewPort }: NoticeSectionProps) => {
  return viewPort === "mobile" ? (
    <div className={styles[`${viewPort}-wrapper`]}>
      <div className={styles[`${viewPort}-category`]}>Notice</div>
      <div className={styles[`${viewPort}-list`]}>
        {dummyNoticeSectionData.map((item: any, index: number) => {
          return (
            index < 3 && (
              <div className={styles[`${viewPort}-list__item`]} key={index}>
                <p className={styles[`${viewPort}-category-detail`]}>공지</p>
                <LuMegaphone size={17} style={{ flexShrink: 0 }} />
                <p className={styles[`${viewPort}-title`]}>{item.title}</p>
                <p className={styles[`${viewPort}-explan`]}>{item.text}</p>
              </div>
            )
          );
        })}
      </div>
    </div>
  ) : (
    <div className={styles[`${viewPort}-wrapper`]}>
      <div className={styles[`${viewPort}-category`]}>Notice</div>
      <div className={styles[`${viewPort}-list`]}>
        {dummyNoticeSectionData.map((item: any, index: number) => {
          return (
            index < 4 && (
              <div className={styles[`${viewPort}-list__item`]} key={index}>
                <p className={styles[`${viewPort}-category-detail`]}>공지</p>
                <LuMegaphone size={17} style={{ flexShrink: 0 }} />
                <p className={styles[`${viewPort}-title`]}>{item.title}</p>
                <p className={styles[`${viewPort}-explan`]}>{item.text}</p>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default NoticeSection;
