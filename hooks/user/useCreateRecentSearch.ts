import { useMutation, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const mutationFn = async (requestBody: any) => {
  const response = await instance.post("/user/recentSearch", requestBody);

  return response.data;
};

const useCreateRecentSearch = (userMe_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: any) => mutationFn(requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.recentSearch(userMe_id) });
    },
    onError: (error: any) => {
      console.log(error);
    }
  })
};

export { useCreateRecentSearch };