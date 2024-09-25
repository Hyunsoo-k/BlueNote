import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Post } from "@/types/post";
import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const deleteCommentFn = async (post: Post, comment_id: string) => {
  const response = await instance.delete(`/bbs/${post.mainCategory}/${post._id}/comment/${comment_id}`);

  return response;
};

const useDeleteComment = (post: Post, closeModal: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment_id: string) => deleteCommentFn(post, comment_id),
    onSuccess: () => {
      closeModal(null, "", closeModal);
      queryClient.invalidateQueries({ queryKey: queryKey.post(post.mainCategory, post._id) });
    },
    onError: (error: any) => {
      console.log(error);
    }
  });
};

export { useDeleteComment };
