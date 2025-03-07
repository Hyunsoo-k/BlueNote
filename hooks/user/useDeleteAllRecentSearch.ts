import { useMutation, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const mutationFn = async () => {
  const response = await instance.delete("/user/recentSearch");

  return response.data;
};

const useDeleteAllRecentSearch = (userMe: any, closeModal: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!userMe) {
        return null;
      };

      return mutationFn();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.recentSearch(userMe._id )});
      closeModal();
    },
    onError: (error: any) => {
      console.log(error);
    }
  });
};

export { useDeleteAllRecentSearch };