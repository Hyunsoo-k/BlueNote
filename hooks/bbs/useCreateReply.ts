import { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/axios"
import { queryKey } from "@/queryKey";

interface RequestBodyType {
  post_id: string;
  comment_id: string;
  content: string;
};

const createReplyFn = async (comment_id: string, requestBody: RequestBodyType) => {
  const response = await instance.post(`${window.location.pathname}/comment/${comment_id}/reply`, requestBody);

  return response.data;
};

const useCreateReply = (
  post_id: string,
  comment_id: string,
  setIsCreateReplyOpen: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: RequestBodyType) => createReplyFn(comment_id, requestBody),
    onSuccess: () => {
      setIsCreateReplyOpen(false);
      
      queryClient.invalidateQueries({ queryKey: queryKey.post(post_id) });
    },
    onError: (e: any) => { console.log(e);}
  });
};

export { useCreateReply };