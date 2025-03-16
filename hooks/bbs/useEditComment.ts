import { useMutation, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

interface RequestBodyType {
  content: string;
};

const editCommentFn = async (comment_id: string, requestBody: RequestBodyType) => {
  const response = await instance.patch(`${window.location.pathname}/comment/${comment_id}`, requestBody);

  return response;
};

const useEditComment = (
  post_id: string,
  comment_id: string,
  setIsEditing: any,
  reset: any
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: RequestBodyType) => editCommentFn(comment_id, requestBody),
    onSuccess: () => {
      setIsEditing(false);
      reset();
      queryClient.invalidateQueries({ queryKey: queryKey.post(post_id) });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export { useEditComment };
