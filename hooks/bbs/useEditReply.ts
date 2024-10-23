import { useMutation, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const editReplyFn = async (
  asPath: string,
  comment_id:string,
  reply_id: string,
  requestBody: any
) => {
  const response = await instance.patch(`${asPath}/comment/${comment_id}/reply/${reply_id}`, requestBody);

  return response.data;
};

const useEditReply = (
  asPath: string,
  post: any,
  comment_id: string,
  reply_id: string,
  reset: any,
  setToggleEditField: any
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestbody: any) => editReplyFn(asPath, comment_id, reply_id, requestbody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.post(post._id) });
      reset();
      setToggleEditField(false);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export { useEditReply };
