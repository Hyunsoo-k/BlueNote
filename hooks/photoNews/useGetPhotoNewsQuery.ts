import { useQuery } from "@tanstack/react-query";

import { instance } from "@/axios";
import { queryKey } from "@/queryKey";

const queryFn = async () => {
  const response = await instance.get("/photoNews");

  return response.data;
};

const useGetPhotoNewsQuery = () => {
  return useQuery({
    queryKey: queryKey.photoNews,
    queryFn
  });
};

export default useGetPhotoNewsQuery;