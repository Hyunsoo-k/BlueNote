import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MainCategory } from "@/types/categorys";
import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const recommendPostFn = async (mainCategory: MainCategory, post_id: string) => {
  const response = await instance.post(`/bbs/${mainCategory}/post/${post_id}/recommend`);

  return response;
};

const useRecommendPost = (mainCategory: MainCategory, post_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => recommendPostFn(mainCategory, post_id),
    onSuccess: () => {
      console.log("recommend done.");
      queryClient.invalidateQueries({ queryKey: queryKey.post(mainCategory,post_id) });
    },
    onError: (error: any) => { console.log(error); }
  });
};

export { useRecommendPost };