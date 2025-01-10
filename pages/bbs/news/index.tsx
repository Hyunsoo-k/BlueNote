import { GetServerSideProps } from "next";
import { useContext } from "react";

import { instance } from "@/axios";
import { ViewportContext } from "@/contexts/viewport";
import { useGetUserQuery } from "@/hooks/user/useGetUserQuery";
import BbsHeader from "@/components/bbs/bbsHeader";
import MobileThumbnailList from "@/components/bbs/thumbnailList/mobileThumbnailList";
import TabletThumbnailList from "@/components/bbs/thumbnailList/tabletThumbnailList";
import MobilePostActionBar from "@/components/bbs/mobilePostActionBar";
import Pagination from "@/components/pagination";
import SearchingBar from "@/components/searchingBar";
import CreatePostButton from "@/components/bbs/createPostButton";

import styles from "./index.module.scss";
import ActionBox from "@/components/bbs/actionBox";

interface Props {
  query: any;
  resolvedUrl: string;
  initialData: any;
};

const NewsPage = ({ query, resolvedUrl, initialData }: Props) => {
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
      />
      {viewport === "mobile" && (
        <MobileThumbnailList
          initialData={initialData}
          resolvedUrl={resolvedUrl}
          viewport={viewport}
        />
      )}
      {viewport !== "mobile" && (
        <TabletThumbnailList
          initialData={initialData}
          resolvedUrl={resolvedUrl}
          viewport={viewport}
          userMe={userMe}
        />
      )}
      {viewport === "mobile" && <MobilePostActionBar mainCategory={initialData.mainCategory} />}
      {viewport !== "mobile" && (
        <ActionBox
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

export default NewsPage;

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
