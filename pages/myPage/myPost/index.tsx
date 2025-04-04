import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import { BbsType } from "@/types/bbs/bbs";
import { useGetViewport } from "@/hooks/viewport";
import MyPageMenu from "@/components/myPage/myPageMenu";
import BbsList from "@/components/bbsList";

import styles from "./index.module.scss";
import MyPageHeader from "@/components/myPage/myPageHeader";

interface ServerSideProps {
  initialData: BbsType;
};

const MyPostPage = ({ initialData }: ServerSideProps) => {
  const viewport = useGetViewport();

  return (
    <div className={styles["container"]}>
      {viewport === "mobile" && (
        <MyPageHeader />
      )}
      {viewport !== "mobile" && <MyPageMenu currentPage="내가 쓴 글" />}
      <div className={styles["main"]}>
        {viewport !== "mobile" && (
          <div className={styles["header"]}>
            <p className={styles["header__title"]}>내가 쓴 글</p>
          </div>
        )}
        <div className={styles["content"]}>
          <BbsList viewport={viewport} resolvedUrl="/myPostList" initialData={initialData} />
        </div>
      </div>
    </div>
  );
};

export default MyPostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken } = context.req.cookies;

  const { data: initialData } = await instance.get(`/MyPostList`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    props: {
      initialData,
    },
  };
};
