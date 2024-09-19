import { useEffect, useState } from "react";
import { LuMegaphone } from "react-icons/lu"; // 공지
import { TbNews } from "react-icons/tb"; // 국내
import { TbWorld } from "react-icons/tb"; // 국외
import { SlSpeech } from "react-icons/sl"; // 일반
import { LuCassetteTape } from "react-icons/lu"; // 녹음
import { MdOutlineTipsAndUpdates } from "react-icons/md"; // 팁
import { MdGroups } from "react-icons/md"; // 밴드홍보
import { PiVinylRecordLight } from "react-icons/pi"; // 앨범홍보
import { GiGrandPiano } from "react-icons/gi"; // 재즈바홍보
import { RiUserSearchLine } from "react-icons/ri"; // 구인
import { RiUserSearchFill } from "react-icons/ri"; // 구직

import styles from "./index.module.scss";

interface Props {
  postsData: any;
}

const MainPageSection = ({ postsData }: Props) => {
  const { mainCategory, postList } = postsData;
  const [parsedPostList, setParsedPostList] = useState<any[]>([]);

  const iconMap = {
    공지: LuMegaphone,
    국내: TbNews,
    국외: TbWorld,
    일반: SlSpeech,
    녹음: LuCassetteTape,
    팁: MdOutlineTipsAndUpdates,
    밴드홍보: MdGroups,
    앨범홍보: PiVinylRecordLight,
    재즈바홍보: GiGrandPiano,
    구인: RiUserSearchLine,
    구직: RiUserSearchFill,
  };

  useEffect(() => {
    const parsedContent = postList.map((post: any) => {
      const parser = new DOMParser();
      const textHtml = parser.parseFromString(post.content, "text/html");

      return { ...post, extractedText: textHtml.body.textContent };
    });

    setParsedPostList(parsedContent);
  }, [postList]);

  return (
    <div className={styles["MainPageSection"]}>
      <div className={styles["MainPageSection__main-category"]}>{mainCategory}</div>
      <div className={styles["MainPageSection__list"]}>
        {parsedPostList.map((post: any, index: number) => {
          const IconComponent = iconMap[post.subCategory];

          return (
            index < 4 && (
              <ul className={styles["MainPageSection__element"]} key={index}>
                <li className={styles["MainPageSection__sub-category"]}>{post.subCategory}</li>
                <IconComponent size={17} style={{ flexShrink: 0 }} />
                <li className={styles["MainPageSection__title"]}>{post.title}</li>
                <li className={styles["MainPageSection__content"]}>{post.extractedText}</li>
              </ul>
            )
          );
        })}
      </div>
    </div>
  );
};

export default MainPageSection;
