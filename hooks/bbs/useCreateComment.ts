import { useMutation, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const createCommentFn = async (asPath: string, requestBody: any) => {
  const response = await instance.post(`${asPath}/comment`, requestBody);
  
  return response;
};

const useCreateComment = (asPath: string, post_id: string, resetCreate: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: any) => createCommentFn(asPath, requestBody),
    onSuccess: () => {
      resetCreate();
      queryClient.invalidateQueries({ queryKey: queryKey.post(post_id) });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export { useCreateComment };
