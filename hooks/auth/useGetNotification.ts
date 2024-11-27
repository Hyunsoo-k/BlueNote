import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const getNotificationFn = async () => {
  const response = await instance.get(`/user/notification`);

  return response.data;
};

const useGetNotification = (userMe_id: string) => {
  return (
    useQuery({
      queryKey: queryKey.notification(userMe_id),
      queryFn: getNotificationFn,
      gcTime: Infinity,
      staleTime: 10 * 6 * 1000,
    })
  );
};

export default useGetNotification;