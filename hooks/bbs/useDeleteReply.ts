import { useMutation, useQueryClient } from "@tanstack/react-query"

import { PostType } from "@/types/post";
import { instance } from "@/axios"
import { queryKey } from "@/queryKey";

const deleteReplyFn = async (asPath: string, commend_id: any, reply_id: string) => {
  const response = await instance.delete(`${asPath}/comment/${commend_id}/reply/${reply_id}`);

  return response.data;
};

const useDeleteReply = (asPath: string, post: PostType, commend_id: string, closeModal: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reply_id: string) => deleteReplyFn(asPath, commend_id, reply_id),
    onSuccess: () => {
      closeModal(null, "", closeModal);
      queryClient.invalidateQueries({ queryKey: queryKey.post(post._id) });
    },
    onError: (error: any) => {
      console.log(error);
    }
  })
};

export { useDeleteReply };