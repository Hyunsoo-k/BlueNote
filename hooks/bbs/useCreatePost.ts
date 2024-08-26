import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { MainCategory } from "@/types/categorys";
import { instance } from "@/axios";

const createPost = async (main: MainCategory, req: any) => {
  const response = await instance.post(`/bbs/${main}/post`, req);
  return response;
};

const useCreatePost = (main: MainCategory) =>{
  const router = useRouter();
  return (
    useMutation({
      mutationFn: (req: any) => createPost(main, req),
      onSuccess: () => {
        router.push(`/bbs/${main}`);
      }
    })
  )
}

export { useCreatePost };
