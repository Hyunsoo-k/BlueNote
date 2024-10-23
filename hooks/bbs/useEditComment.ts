import { useMutation, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const editCommentFn = async (comment_id: string, requestBody: any) => {
  const response = await instance.patch(`${window.location.pathname}/comment/${comment_id}`, requestBody);

  return response;
};

const useEditComment = (
  post_id: string,
  comment_id: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: any) => editCommentFn(comment_id, requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.post(post_id) });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export { useEditComment };