import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import { MainCategory } from "@/types/categorys";
import { instance } from "@/axios";

const createPost = async (mainCategory: MainCategory, req: any) => {
  const response = await instance.post(`/bbs/${mainCategory}/post`, req);
  
  return response;
};

const useCreatePost = (mainCategory: MainCategory) => {
  const router = useRouter();

  return (
    useMutation({
      mutationFn: (req: any) => createPost(mainCategory, req),
      onSuccess: () => {
        router.push(`/bbs/${mainCategory}`);
      }
    })
  )
}

export { useCreatePost };
