import { useRouter } from "next/router";
import { useMutation } from '@tanstack/react-query';

import { Post } from "@/types/post";
import { instance } from '@/axios';
import useModal from "@/hooks/modal/useModal";

const deletePostFn = async (post: Post) => {
  const response = await instance.delete(`/bbs/${post.mainCategory}/post/${post._id}`);

  return response;
};

const useDeletePost = (post: Post) => {
  const router = useRouter();
  const { closeModal } = useModal();

  return (
    useMutation({
      mutationFn: () => deletePostFn(post),
      onSuccess: () => {
        closeModal();
        router.push(`/bbs/${post.mainCategory}`);
      },
      onError: (error: any) => {
        console.log(error);
      }
    })
  )
}

export { useDeletePost };