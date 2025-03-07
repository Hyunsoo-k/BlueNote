import { useRouter } from "next/router";

import styles from "./index.module.scss";
import useModal from "@/hooks/modal/useModal";

interface Props {
  userMe: any;
  isMyPage: boolean;
};

const CreatePostButton = ({ userMe, isMyPage }: Props) => {
  const router = useRouter();

  const { openModal, closeModal } = useModal();

  const isNoticeOrNewsPage =
    router.pathname.split("/")[2] === "notice" ||
    router.pathname.split("/")[2] === "news";

  const mainCategory = !isMyPage ? router.pathname.split("/").pop() : null;

  const handleClickButton = () => {
    if (!userMe) {
      return openModal("alert", "로그인이 필요한 기능입니다.", closeModal);
    };
    
    router.push(`/bbs/${mainCategory}/post/createPost`)
  };

  if (isMyPage) {
    return null;
  };

  if (isNoticeOrNewsPage && userMe?.role === 1 || !isNoticeOrNewsPage) {
    return (
      <button
        onClick={handleClickButton}
        className={styles["create-post-button"]}
      >
        글쓰기
      </button>
    )
  };
};

export default CreatePostButton;