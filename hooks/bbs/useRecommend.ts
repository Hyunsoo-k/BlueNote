import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MainCategoryType } from "@/types/categorys";
import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const recommendPostFn = async (mainCategory: MainCategoryType, post_id: string, requsetBody: any) => {
  const response = await instance.post(`/bbs/${mainCategory}/post/${post_id}/recommend`, requsetBody);

  return response;
};

const useRecommendPost = (mainCategory: MainCategoryType, post_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requsetBody: any) => recommendPostFn(mainCategory, post_id, requsetBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.post(post_id) });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export { useRecommendPost };
