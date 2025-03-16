import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import { PostType } from "@/types/post/post";
import { instance } from "@/axios";

const deletePostFn = async (post: PostType) => {
  const response = await instance.delete(`/bbs/${post.mainCategory}/post/${post._id}`);

  return response;
};

const useDeletePost = (post: PostType, closeModal: any) => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => deletePostFn(post),
    onSuccess: () => {
      closeModal();
      
      router.push(`/bbs/${post.mainCategory}`);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export { useDeletePost };
