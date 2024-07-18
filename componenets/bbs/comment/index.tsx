import styles from "./index.module.scss";

const Comment = () => {
  return (
    <div className={styles["board-post__comment"]}>
      <p className={styles["board-post__comment__header"]}>
        댓글 <span>17개</span>
      </p>
      <div className={styles["board-post__comment__box"]}>
        <div className={styles["board-post__comment__box__content"]}>
          <div className={styles["board-post__comment__box__content__header"]}>
            <p className={styles["board-post__comment__box__content__name"]}>운영자</p>
            <p className={styles["board-post__comment__box__content__date"]}>
              2024/6/22 <span>13:11</span>
            </p>
          </div>
          <p className={styles["board-post__comment__box__content__main"]}>
            피선거권이 있고 선거일 현재 40세에 달하여야 한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의
            3분의 1 이상이 아니면 대통령으로 당선될 수 없다. 국회는 의장 1인과 부의장 2인을 선출한다. 국무위원은
            국무총리의 제청으로 대통령이 임명한다. 헌법개정은 국회재적의원 과반수 또는 대통령의 발의로 제안된다.
          </p>
        </div>
        <div className={styles["board-post__comment__box__content"]}>
          <div className={styles["board-post__comment__box__content__header"]}>
            <p className={styles["board-post__comment__box__content__name"]}>운영자</p>
            <p className={styles["board-post__comment__box__content__date"]}>
              2024/6/22 <span>13:11</span>
            </p>
          </div>
          <p className={styles["board-post__comment__box__content__main"]}>
            피선거권이 있고 선거일 현재 40세에 달하여야 한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의
            3분의 1 이상이 아니면 대통령으로 당선될 수 없다. 국회는 의장 1인과 부의장 2인을 선출한다. 국무위원은
            국무총리의 제청으로 대통령이 임명한다. 헌법개정은 국회재적의원 과반수 또는 대통령의 발의로 제안된다.
          </p>
        </div>
        <div className={styles["board-post__comment__box__content"]}>
          <div className={styles["board-post__comment__box__content__header"]}>
            <p className={styles["board-post__comment__box__content__name"]}>운영자</p>
            <p className={styles["board-post__comment__box__content__date"]}>
              2024/6/22 <span>13:11</span>
            </p>
          </div>
          <p className={styles["board-post__comment__box__content__main"]}>
            피선거권이 있고 선거일 현재 40세에 달하여야 한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의
            3분의 1 이상이 아니면 대통령으로 당선될 수 없다. 국회는 의장 1인과 부의장 2인을 선출한다. 국무위원은
            국무총리의 제청으로 대통령이 임명한다. 헌법개정은 국회재적의원 과반수 또는 대통령의 발의로 제안된다.
          </p>
        </div>
        <div className={styles["board-post__writing-comment-feild"]}>
          <textarea spellCheck="false" className={styles["board-post__writing-comment-feild__input"]}></textarea>
          <div className={styles["board-post__writing-comment-feild__btn"]}>
            <p>등록</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
