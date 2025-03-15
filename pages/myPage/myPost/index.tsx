import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import { useGetViewport } from "@/hooks/viewport";
import MyPageMenu from "@/components/myPageMenu";
import Pagination from "@/components/bbs/control/pagination";

import styles from "./index.module.scss";

interface ServerSideProps {
  initialData: any;
}

const MyPostPage = ({ initialData }: ServerSideProps) => {
  const viewport = useGetViewport();

  return (
    <div></div>
    // <div className={styles["container"]}>
    //   <MyPageMenu currentPage="내가 쓴 글" />
    //   <div className={styles["main"]}>
    //     <div className={styles["header"]}>
    //       <p className={styles["header__title"]}>내가 쓴 글</p>
    //       <div className={styles["information__box"]}>
    //         <p className={styles["post-count"]}>
    //           총 게시물<span>{initialData.totalPostCount}개</span>
    //         </p>
    //         <p className={styles["current-page"]}>
    //           현재
    //           <span>
    //             ({initialData.page}/{initialData.totalPage})
    //           </span>
    //           페이지
    //         </p>
    //       </div>
    //     </div>
    //     <div className={styles["content"]}>
    //       <TabletPostList postList={initialData.postList} />
    //       <Pagination page={initialData.page} totalPage={initialData.totalPage} />
    //     </div>
    //   </div>
    // </div>
  );
};

export default MyPostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { accessToken } = context.req.cookies;

  if (query.page) {
    const { data: initialData } = await instance.get(`/MyPostList?page=${query.page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      props: {
        initialData,
      },
    };
  } else {
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
  }
};
