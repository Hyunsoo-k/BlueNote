import { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

interface RequestBodyType {
  content: string;
};

const editReplyFn = async (
  comment_id:string,
  reply_id: string,
  requestBody: RequestBodyType
) => {
  const response = await instance.patch(`${window.location.pathname}/comment/${comment_id}/reply/${reply_id}`, requestBody);

  return response.data;
};

const useEditReply = (
  post_id: string,
  comment_id: string,
  reply_id: string,
  setIsEditing: Dispatch<SetStateAction<boolean>>,
  reset: any
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestbody: RequestBodyType) => editReplyFn(comment_id, reply_id, requestbody),
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

export { useEditReply };
