import { useMutation, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const deleteNotificationFn = async (notification_id: string) => {
  const response = await instance.delete(`/user/notification/${notification_id}`);

  return response.data;
};

const useDeleteNotification = (userMe_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notification_id: string) => deleteNotificationFn(notification_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.notification(userMe_id) });
    },
    onError: (error: any) => {
      console.log(error);
    }
  })
};

export { useDeleteNotification };