import dynamic from "next/dynamic";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";

import { MainCategory } from "@/types/categorys";
import { subCategoryListMap } from "@/variable";
import { useCreatePost } from "@/hooks/bbs/useCreatePost";

import styles from "./index.module.scss";

const WysiwygEditor = dynamic(() => import("@/components/bbs/wysiwygEditor"), { ssr: false });

interface Props {
  mainCategory: MainCategory;
}

const CreatePost = ({ mainCategory }: Props) => {
  const subCategoryList = subCategoryListMap[mainCategory].filter((item) => item !== "All");

  const [currentCategory, setCurrentCategory] = useState<string>(subCategoryList[0]);
  const editorRef = useRef<any>(null);

  const mutationHandler = useCreatePost(mainCategory);
  const { register, handleSubmit } = useForm({ mode: "onChange" });

  const submitHandler = {
    onSubmit: (data: any) => {
      if (editorRef.current) {
        const editorInstance = editorRef.current.getInstance().getHTML();
        const req = {
          subCategory: currentCategory,
          title: data.title,
          content: editorInstance,
        };

        console.log(req);
      } else {
        console.log("error");
      }
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
            작성자<span>운영자</span>
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
        <WysiwygEditor editorRef={editorRef} />
      </div>
      <button type="submit" className={styles["create-post__submit-btn"]}>
        등록
      </button>
    </form>
  );
};

export default CreatePost;
