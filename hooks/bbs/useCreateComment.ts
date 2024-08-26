import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "@/axios";
import { queryKey } from "@/querykey";
import { MainCategory } from "@/types/categorys";

const createCommentFn = async (mainCategory: MainCategory, post_id: string, req: any) => {
  const response = await instance.post(`/bbs/${mainCategory}/${post_id}/comment`, req);
  console.log()
  return response;
};

const useCreateComment = (mainCategory: MainCategory, post_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: any) => createCommentFn(mainCategory, post_id, req), // Updated signature
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.post(mainCategory, post_id) });
    },
  });
};

export { useCreateComment };
