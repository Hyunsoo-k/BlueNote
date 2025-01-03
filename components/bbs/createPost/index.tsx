import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

import { MainCategory } from "@/types/categorys";
import { useGetUser } from "@/hooks/user/useGetUser";
import { subCategoryListMap } from "@/variable";
import { useCreatePost } from "@/hooks/bbs/useCreatePost";
import { uploadImageToFirebase, dataURLToBlob } from "@/utils/firebase";

import styles from "./index.module.scss";

import "react-quill/dist/quill.snow.css";

const Wysiwyg = dynamic(() => import("@/components/bbs/wysiwyg"), { ssr: false });

interface Props {
  mainCategory: MainCategory;
};

const CreatePost = ({ mainCategory }: Props) => {
  const subCategoryList = subCategoryListMap[mainCategory].filter((item) => item !== "All");
  const [currentCategory, setCurrentCategory] = useState<string>(subCategoryList[0]);

  const wysiwygRef = useRef<any>(null);

  const { data: userMe } = useGetUser();

  const createPostMutation = useCreatePost(mainCategory);

  const { register, handleSubmit } = useForm({ mode: "onChange" });

  const submitHandler = {
    onSubmit: async (data: any) => {
      const editor = wysiwygRef.current.getEditor();
      const content = editor.root.innerHTML;
      const parser = new DOMParser();
      const parsedContent = parser.parseFromString(content, "text/html");
      const imgTagList = parsedContent.querySelectorAll("img");
  
      Array.from(imgTagList).forEach(async (imgTag) => {
        const src = imgTag.getAttribute("src");
      
        if (src?.startsWith("data:")) {
          const blob = dataURLToBlob(src);
          const fileName = Date.now().toString();
          const StorageURL = await uploadImageToFirebase(`bbs/${mainCategory}/${fileName}`, blob);
      
          imgTag.setAttribute("src", StorageURL || "");
        }
      });
  
      const requestBody = {
        subCategory: currentCategory,
        title: data.title,
        content: parsedContent.body.innerHTML
      };
  
      createPostMutation.mutate(requestBody);
    },
    onError: (error: any) => {
      console.log(error);
    },
  };

  return (
    <form onSubmit={handleSubmit(submitHandler.onSubmit, submitHandler.onError)} className={styles["create-post"]}>
      <p className={styles["create-post__main-category"]}>{mainCategory}</p>
      <div className={styles["create-post__header"]}>
        <input
          {...register("title", { required: "필수 값 입니다." })}
          placeholder="제목"
          className={styles["create-post__title"]}
        />
        <div className={styles["create-post__details"]}>
          <p className={styles["create-post__writer"]}>
            작성자<span>{userMe?.nickname}</span>
          </p>
          <div className={styles["create-post__sub-category-list"]}>
            <p className={styles["create-post__division"]}>분류</p>
            {subCategoryList.map((item: string, index: number) => (
              <p
                key={index}
                onClick={() => setCurrentCategory(item)}
                className={`${
                  currentCategory === item
                    ? styles["create-post__sub-category--selected"]
                    : styles["create-post__sub-category"]
                }`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={styles["create-post__content"]}>
        <Wysiwyg wysiwygRef={wysiwygRef} />
      </div>
      <button type="submit" className={styles["create-post__submit-btn"]}>
        등록
      </button>
    </form>
  );
};

export default CreatePost;
