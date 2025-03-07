import { GetServerSideProps } from "next";
import { useContext } from "react";

import { instance } from "@/axios";
import { ViewportContext } from "@/contexts/viewport";
import { useGetUserQuery } from "@/hooks/user/useGetUserQuery";
import BbsHeader from "@/components/bbs/bbsHeader";
import MobilePostList from "@/components/bbs/postList/mobilePostList";
import TabletPostList from "@/components/bbs/postList/tabletPostList";
import BbsControl from "@/components/bbs/control/bbsControl";
import MobileBbsControl from "@/components/bbs/control/MobileBbsControl";

import styles from "./index.module.scss";

interface ServerSideProps {
  query: any;
  resolvedUrl: string;
  initialData: any;
}

const BoardPage = ({ query, resolvedUrl, initialData }: ServerSideProps) => {
  const viewportContext = useContext(ViewportContext);

  const viewport = viewportContext?.viewport || "mobile";

  const { data: userMe } = useGetUserQuery();

  return (
    <div className={styles["container"]}>
      <BbsHeader
        mainCategory={initialData.mainCategory}
        subCategory={initialData.subCategory}
        totalPostCount={initialData.totalPostCount}
        page={query.page || 1}
        totalPage={initialData.totalPage}
        viewport={viewport}
      />
      {viewport === "mobile" && (
        <MobilePostList initialData={initialData} resolvedUrl={resolvedUrl} viewport={viewport} />
      )}
      {viewport !== "mobile" && <TabletPostList postList={initialData.postList} />}
      {viewport === "mobile" && <MobileBbsControl userMe={userMe} mainCategory="promote" isNoticeOrNewsPage={false} />}
      {viewport !== "mobile" && (
        <BbsControl
          userMe={userMe}
          isMyPage={false}
          subCategory={query.subCategory || "All"}
          page={initialData.page || 1}
          totalPage={initialData.totalPage}
        />
      )}
    </div>
  );
};

export default BoardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, resolvedUrl } = context;
  const { data: initialData } = await instance.get(resolvedUrl);

  return {
    props: {
      query,
      resolvedUrl,
      initialData,
    },
  };
};
