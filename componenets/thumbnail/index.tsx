import styles from "./index.module.scss";

const Thumbnail = () => {
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
    "/images/carousel/jazzPic.jpg",
    "/images/carousel/playing-trumpet.png",
    "/images/carousel/seoul-jazz-festival.png",
  ];

  return (
    <div className={styles["thumbnail"]}>
      {imgSrc.map((item: string, index: number) => (
        <div key={index} className={styles["thumbnail__element"]}>
          <div
            className={styles["thumbnail__element__bg"]}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${item})`,
            }}
          >
            <p className={styles["thumbnail__element__bg__info"]}>
              <span>국내</span> | 2024/06/22
            </p>
          </div>
          <div className={styles["thumbnail__element__description"]}>
            <p className={styles["thumbnail__element__title"]}>Golden swing band</p>
            <p className={styles["thumbnail__element__main-text"]}>
              촉망받는 재즈기타리스트 줄리안 라지가 제 20회 자라섬 페스티벌에 참여합니다. 뛰어난 기술과 독창적인
              음악성으로 널리 알려져 있으며, 다양한 음악 장르를 넘나드는 그의 연주는 많은 이들에게 영감을
              줍니다.촉망받는 재즈기타리스트 줄리안 라지가 제 20회 자라섬 페스티벌에 참여합니다. 뛰어난 기술과 독창적인
              음악성으로 널리 알려져 있으며, 다양한 음악 장르를 넘나드는 그의 연주는 많은 이들에게 영감을 줍니다.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Thumbnail;
