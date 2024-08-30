import { LuMegaphone } from "react-icons/lu";
import { TbNews } from "react-icons/tb";
import { GiNothingToSay } from "react-icons/gi"; //동그란 말풍선
import { GiGrandPiano } from "react-icons/gi"; //피아노
import { CiSearch } from "react-icons/ci"; //돋보기

import styles from "./index.module.scss";

interface Props {
  viewPort: any;
  category: any;
  detail: any;
  data: any;
}

const MainPageSection = ({ viewPort, category, detail, data }: Props) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className={styles["MainPageSection"]}>
      <div className={styles["MainPageSection__category"]}>{category}</div>
      <div className={styles["MainPageSection__list"]}>
        {viewPort === "mobile"
          ? data.map((item: any, index: number) => {
              return (
                index < 3 && (
                  <div className={styles["MainPageSection__list__element"]} key={index}>
                    <p className={styles["MainPageSection__list__element__category-detail"]}>{detail}</p>
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
                    <p className={styles["MainPageSection__list__element__title"]}>{truncateText(item.title, 13)}</p>
                    <p className={styles["MainPageSection__list__element__explan"]}>{item.text}</p>
                  </div>
                )
              );
            })
          : data.map((item: any, index: number) => {
              return (
                index < 4 && (
                  <div className={styles["MainPageSection__list__element"]} key={index}>
                    <p className={styles["MainPageSection__list__element__category-detail"]}>{detail}</p>
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
                    <p className={styles["MainPageSection__list__element__title"]}>{item.title}</p>
                    <p className={styles["MainPageSection__list__element__explan"]}>{item.text}</p>
                  </div>
                )
              );
            })}
      </div>
    </div>
  );
};

export default MainPageSection;
