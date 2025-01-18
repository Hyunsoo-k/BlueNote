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
    mutationFn: (variables: any) => checkNotificationFn(variables.notification_id),
    onSuccess: async (data: any, variables: any) => {
      await queryClient.invalidateQueries({ queryKey: queryKey.notification(userMe_id) });
      variables.navigate();
    },
    onError: (error: any) => {
      console.log(error);
    }
  })
};

export { useCheckNotification };