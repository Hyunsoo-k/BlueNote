import { useMutation, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/axios"
import { queryKey } from "@/queryKey";

const createReplyFn = async (comment_id: string, requestBody: any) => {
  const response = await instance.post(`${window.location.pathname}/comment/${comment_id}/reply`, requestBody);

  return response.data;
};

const useCreateReply = (
  post_id: string,
  comment_id: string,
  setShowCreateReply: any
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: any) => createReplyFn(comment_id, requestBody),
    onSuccess: () => {
      setShowCreateReply(false);
      queryClient.invalidateQueries({ queryKey: queryKey.post(post_id) });
    },
    onError: (e: any) => { console.log(e);}
  });
};

export { useCreateReply };