import { LuMegaphone } from "react-icons/lu"; //메가폰
import { TbNews } from "react-icons/tb";
import { ImNewspaper } from "react-icons/im"; //신문지
import { GiNothingToSay } from "react-icons/gi"; //동그란 말풍선
import { SlSpeech } from "react-icons/sl"; //네모난 말풍선
import { FaRegLightbulb } from "react-icons/fa"; //전구
import { GiGrandPiano } from "react-icons/gi"; //피아노
import { CiSearch } from "react-icons/ci"; //돋보기

import { MainPageSectionProps } from "@/types/mainpage-section";
import styles from "./index.module.scss";

const MainPageSection = ({ viewPort, category, detail, data }: MainPageSectionProps) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["category"]}>{category}</div>
      <div className={styles["list"]}>
        {viewPort === "mobile"
          ? data.map((item: any, index: number) => {
              return (
                index < 3 && (
                  <div className={styles["list__item"]} key={index}>
                    <p className={styles["category-detail"]}>{detail}</p>
                    {category === "Notice" ? (
                      <LuMegaphone size={17} style={{ flexShrink: 0 }} />
                    ) : category === "News" ? (
                      <TbNews size={17} style={{ flexShrink: 0 }} />
                    ) : category === "Board" ? (
                      <GiNothingToSay size={17} style={{ flexShrink: 0 }} />
                    ) : category === "Promote" ? (
                      <GiGrandPiano size={17} style={{ flexShrink: 0 }} />
                    ) : (
                      <CiSearch size={17} style={{ flexShrink: 0 }} />
                    )}
                    <p className={styles["title"]}>{truncateText(item.title, 13)}</p>
                    <p className={styles["explan"]}>{item.text}</p>
                  </div>
                )
              );
            })
          : data.map((item: any, index: number) => {
              return (
                index < 4 && (
                  <div className={styles["list__item"]} key={index}>
                    <p className={styles["category-detail"]}>{detail}</p>
                    {category === "Notice" ? (
                      <LuMegaphone size={17} style={{ flexShrink: 0 }} />
                    ) : category === "News" ? (
                      <TbNews size={17} style={{ flexShrink: 0 }} />
                    ) : category === "Board" ? (
                      <GiNothingToSay size={17} style={{ flexShrink: 0 }} />
                    ) : category === "Promote" ? (
                      <GiGrandPiano size={17} style={{ flexShrink: 0 }} />
                    ) : (
                      <CiSearch size={17} style={{ flexShrink: 0 }} />
                    )}
                    <p className={styles["title"]}>{item.title}</p>
                    <p className={styles["explan"]}>{item.text}</p>
                  </div>
                )
              );
            })}
      </div>
    </div>
  );
};

export default MainPageSection;
