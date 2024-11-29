import { useMutation, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const deleteCommentFn = async (comment_id: string) => {
  const response = await instance.delete(`${window.location.pathname}/comment/${comment_id}`);

  return response;
};

const useDeleteComment = (post_id: string, comment_id: string, closeModal: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCommentFn(comment_id),
    onSuccess: () => {
      closeModal(null, "", closeModal);
      queryClient.invalidateQueries({ queryKey: queryKey.post(post_id) });
    },
    onError: (error: any) => {
      console.log(error);
    }
  });
};

export { useDeleteComment };