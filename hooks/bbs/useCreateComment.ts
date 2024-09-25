import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Post } from "@/types/post";
import { MainCategory } from "@/types/categorys";
import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const createCommentFn = async (mainCategory: MainCategory, post_id: string, requestBody: any) => {
  const response = await instance.post(`/bbs/${mainCategory}/${post_id}/comment`, requestBody);
  
  return response;
};

const useCreateComment = (post: Post, resetCreate: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: any) => createCommentFn(post.mainCategory, post._id, requestBody),
    onSuccess: () => {
      resetCreate();
      queryClient.invalidateQueries({ queryKey: queryKey.post(post.mainCategory, post._id) });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export { useCreateComment };
