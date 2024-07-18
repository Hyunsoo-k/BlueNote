import styles from "./index.module.scss";

const BgThumbnail = () => {
  const imgSrc = [
    "/images/carousel/julian.jpg",
    "/images/carousel/jazzPic.jpg",
    "/images/carousel/playing-trumpet.png",
    "/images/carousel/seoul-jazz-festival.png",
    "/images/carousel/julian.jpg",
    "/images/carousel/jazzPic.jpg",
    "/images/carousel/playing-trumpet.png",
    "/images/carousel/seoul-jazz-festival.png",
    "/images/carousel/julian.jpg",
  ];

  return (
    <div className={styles["bg-thumbnail"]}>
      {imgSrc.map((item: string, index: number) => (
        <div
          key={index}
          className={styles["bg-thumbnail__element"]}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${item})`,
          }}
        >
          <div className={styles["bg-thumbnail__element__content"]}>
            <div className={styles["bg-thumbnail__element__header"]}>
              <p>블루노트이용자</p>
              <p>6/22</p>
            </div>
            <p className={styles["bg-thumbnail__element__title"]}>감성 넘치는 재즈를 연주하는 가상의 밴드, 블루 노트입니다.</p>
            {/* <p className={styles["bg-thumbnail__element__main-text"]}>
              촉망받는 재즈기타리스트 줄리안 라지가 제 20회 자라섬 페스티벌에 참여합니다. 뛰어난 기술과 독창적인
              음악성으로 널리 알려져 있으며, 다양한 음악 장르를 넘나드는 그의 연주는 많은 이들에게 영감을
              줍니다.촉망받는 재즈기타리스트 줄리안 라지가 제 20회 자라섬 페스티벌에 참여합니다. 뛰어난 기술과 독창적인
              음악성으로 널리 알려져 있으며, 다양한 음악 장르를 넘나드는 그의 연주는 많은 이들에게 영감을 줍니다.
            </p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BgThumbnail;
