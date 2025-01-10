import { useGetBoardQuery } from "@/hooks/bbs/useGetBoardQuery";
import DetachedThumbnail from "@/components/thumbnail/detachedThumbnail";

import styles from "./index.module.scss";

interface Props {
  initialData: any;
  resolvedUrl: string;
  viewport: string;
  userMe: any;
}

const TabletThumbnailList = ({ initialData, resolvedUrl, viewport, userMe }: Props) => {
  const { data: queryData } = useGetBoardQuery(initialData.mainCategory, resolvedUrl, initialData);

  return (
    <div className={styles["tablet-thumbnail-list"]}>
      {queryData?.postList?.map((post: any, index: number) => (
        <DetachedThumbnail element={post} key={index} />
      ))}
    </div>
  );
};

export default TabletThumbnailList;
