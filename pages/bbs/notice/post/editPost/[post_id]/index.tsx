import EditPost from "@/components/bbs/editPost";
import { GetServerSideProps } from "next";

import { instance } from "@/axios";
import { useGetPost } from "@/hooks/bbs/useGetPost";

import styles from "./index.module.scss";

interface Props {
  initialPost: any;
}

const BoardPostEditPage = ({ initialPost }: Props) => {
  const { data: post } = useGetPost(initialPost);

  return (
    <div className={styles["board-post-edit-page"]}>
      <EditPost post={post} />
    </div>
  );
};

export default BoardPostEditPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resolvedUrl } = context;
  const resourceUrl = resolvedUrl.replace("editPost/", "");
  const { data: initialPost } = await instance.get(resourceUrl);
  
  return {
    props: {
      initialPost
    }
  }
}