import { useMutation, useQueryClient } from "@tanstack/react-query"

import { instance } from "@/axios"
import { queryKey } from "@/queryKey";

const deleteReplyFn = async (commend_id: any, reply_id: string) => {
  const response = await instance.delete(`${window.location.pathname}/comment/${commend_id}/reply/${reply_id}`);

  return response.data;
};

const useDeleteReply = (
  post_id: string,
  commend_id: string,
  reply_id: string,
  closeModal: any
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteReplyFn(commend_id, reply_id),
    onSuccess: () => {
      closeModal(null, "", closeModal);
      queryClient.invalidateQueries({ queryKey: queryKey.post(post_id) });
    },
    onError: (error: any) => {
      console.log(error);
    }
  })
};

export { useDeleteReply };