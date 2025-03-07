import { useMutation, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const mutationFn = async (requestBody: any) => {
  const response = await instance.patch("/user/recentSearch", requestBody);

  return response.data;
};

const useDeleteRecentSearch = (userMe: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestBody: any) => {
      if (!userMe) {
        return await Promise.reject("userMe_is is required");
      }
      
      return mutationFn(requestBody)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.recentSearch(userMe._id) });
    },
    onError: (error: any) => {
      console.log(error);
    }
  })
};

export { useDeleteRecentSearch };