import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Post } from "@/types/post";
import { MainCategory } from "@/types/categorys";
import { instance } from "@/axios";
import { queryKey } from "@/querykey";

const editCommentFn = async (mainCategory: MainCategory, post_id: string, requestData: any) => {
  const { comment_id, requestBody } = requestData;

  const response = await instance.patch(`/bbs/${mainCategory}/${post_id}/comment/${comment_id}`, requestBody);

  return response;
};

const useEditComment = (post: Post, setEditCommentFeild:any, resetEdit: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestData: any) => editCommentFn(post.mainCategory, post._id, requestData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.post(post.mainCategory, post._id) });
      resetEdit();
      setEditCommentFeild((prev: any) => ({ ...prev, show: false, comment_id: "" }));
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export { useEditComment };
