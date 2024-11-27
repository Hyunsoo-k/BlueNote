import { useMutation, useQueryClient } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const checkNotificationFn = async (notification_id: string) => {
  const response = await instance.post(`/user/notification/${notification_id}`);

  return response.data;
};

const useCheckNotification = (userMe_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notification_id: string) => checkNotificationFn(notification_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.notification(userMe_id) });
    },
    onError: (error: any) => {
      console.log(error);
    }
  })
};

export { useCheckNotification };