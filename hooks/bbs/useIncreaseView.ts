import { useMutation } from "@tanstack/react-query";

import { MainCategoryType } from "@/types/categorys";
import { instance } from "@/axios";

const increaseViewsFn = async (mainCategory: MainCategoryType, post_id: string) => {
  const response = await instance.post(`/bbs/${mainCategory}/post/${post_id}/views`)

  return response;
}

const useIncreaseViews = (mainCategory: MainCategoryType, post_id: string) => {
  return useMutation({
    mutationFn: () => increaseViewsFn(mainCategory, post_id),
  })
}

export { useIncreaseViews };