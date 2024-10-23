import { useMutation } from "@tanstack/react-query";

import { MainCategory } from "@/types/categorys";
import { instance } from "@/axios";

const increaseViewsFn = async (mainCategory: MainCategory, post_id: string) => {
  const response = await instance.post(`/bbs/${mainCategory}/post/${post_id}/views`)

  return response;
}

const useIncreaseViews = (mainCategory: MainCategory, post_id: string) => {
  return useMutation({
    mutationFn: () => increaseViewsFn(mainCategory, post_id),
  })
}

export { useIncreaseViews };