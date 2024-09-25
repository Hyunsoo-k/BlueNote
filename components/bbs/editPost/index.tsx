import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

import { MainCategory } from "@/types/categorys";
import { uploadImageToFirebase, dataURLToBlob } from "@/utils/firebase";
import { subCategoryListMap } from "@/variable";
import { useEditPost } from "@/hooks/bbs/useEditPost";
import useModal from "@/hooks/modal/useModal";
import ModalContainer from "@/components/modal/modalContainer";

import styles from "./index.module.scss";

const WysiwygEditor = dynamic(() => import("@/components/bbs/wysiwygEditor"), { ssr: false });

interface Props {
  post: any;
}

const EditPost = ({ post }: Props) => {
  const subCategoryList = subCategoryListMap[post.mainCategory].filter((item: string) => item !== "All");
  const [currentCategory, setCurrentCategory] = useState<string>(post.subCategory);
  const editorRef = useRef<any>(null);

  const editPostMutation = useEditPost(post.mainCategory, post._id);
  const { register, handleSubmit, setValue } = useForm({ mode: "onChange" });

  useEffect(() => {
    setValue("title", post.title);
  }, []);

  const { openModal, closeModal } = useModal();

  const submitHandler = {
    onSubmit: async (data: any) => {
      let content = editorRef.current.getInstance().getHTML();
      const parser = new DOMParser();
      const parsedContent = parser.parseFromString(content, "text/html");
      const imgTagList = parsedContent.querySelectorAll("img");

      for (const imgTag of imgTagList) {
        const src = imgTag.getAttribute("src");

        if (src.startsWith("data:")) {
          const blob = dataURLToBlob(src);
          const fileName = Date.now().toString();
          const StorageURL = await uploadImageToFirebase(`bbs/${post.mainCategory}/${fileName}`, blob);

          imgTag.setAttribute("src", StorageURL);
        }
      }

      content = parsedContent.body.innerHTML;
      const requestBody = {
        subCategory: currentCategory,
        title: data.title,
        content
      };
      editPostMutation.mutate(requestBody);
    },
    onError: (error: any) => {
      error.title && openModal("alert", error.title.message, closeModal);
    },
  };

  return (
    <form onSubmit={handleSubmit(submitHandler.onSubmit, submitHandler.onError)} className={styles["edit-post"]}>
      <p className={styles["edit-post__main-category"]}>{post.mainCategory}</p>
      <div className={styles["edit-post__header"]}>
        <input
          {...register("title", { required: "제목을 입력해주세요." })}
          placeholder="제목"
          className={styles["edit-post__title"]}
        />
        <div className={styles["edit-post__details"]}>
          <p className={styles["edit-post__writer"]}>
            작성자<span>운영자</span>
          </p>
          <ul className={styles["edit-post__sub-category-list"]}>
            <li className={styles["edit-post__division"]}>분류</li>
            {subCategoryList.map((value: string, index: number) => (
              <li
                key={index}
                onClick={() => setCurrentCategory(value)}
                className={`${
                  currentCategory === value
                    ? styles["edit-post__sub-category--selected"]
                    : styles["edit-post__sub-category"]
                }`}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles["edit-post__content"]}>
        <WysiwygEditor editorRef={editorRef} initialContent={post.content}/>
      </div>
      <button type="submit" className={styles["edit-post__submit-btn"]}>
        등록
      </button>
      <ModalContainer />
    </form>
  );
};

export default EditPost;
