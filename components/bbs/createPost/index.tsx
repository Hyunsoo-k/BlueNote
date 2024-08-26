import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";

import { MainCategory } from "@/types/categorys";
import { subCategoryListMap } from "@/variable";
import { useCreatePost } from "@/hooks/bbs/useCreatePost";
import WysiwygEditor from "../wysiwygEditor";

import styles from "./index.module.scss";

interface PostWriteProps {
  mainCategory: MainCategory;
}

const CreatePost = ({ mainCategory }: PostWriteProps) => {
  const subCategoryList = subCategoryListMap[mainCategory].filter((item) => item !== "All");

  const [currentCategory, setCurrentCategory] = useState<string>(subCategoryList[0]);
  const editorRef = useRef<any>(null);

  const mutationHandler = useCreatePost(mainCategory);
  const { register, handleSubmit } = useForm({ mode: "onChange" });

  const submitHandler = {
    onSubmit: (data: any) => {
      const content = editorRef.current;
      const req = {
        subCategory: currentCategory,
        title: data.title,
        content,
      };
      console.log(req);
      // mutationHandler.mutate(req);
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
          <p className={styles["create-post__writer"]}>작성자<span>운영자</span></p>
          <div className={styles["create-post__sub-category-list"]}>
            <p className={styles["create-post__division"]}>분류</p>
            {subCategoryList.map((item: string, index: number) => (
              <p
                key={index}
                onClick={() => setCurrentCategory(item)}
                className={`${currentCategory === item ?
                  styles["create-post__sub-category--selected"] :
                  styles["create-post__sub-category"]
                }`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className={styles["create-post__content"]}>
        <WysiwygEditor ref={editorRef} />
      </div>
      <button type="submit" className={styles["create-post__submit-btn"]}>등록</button>
    </form>
  );
};

export default CreatePost;
