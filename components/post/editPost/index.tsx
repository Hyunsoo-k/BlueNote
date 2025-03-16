import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";

import { uploadImageToFirebase, dataURLToBlob } from "@/utils/firebase";
import { subCategoryListMap } from "@/variable";
import { useEditPost } from "@/hooks/bbs/useEditPost";
import useModal from "@/hooks/modal/useModal";
import ModalContainer from "@/components/modal/modalContainer";

import { PostType } from "@/types/post/post";
import { ViewportType } from "@/types/viewport/viewport";
import { SubCategoryKoreanType } from "@/types/category/categorys";

import styles from "./index.module.scss";

const Wysiwyg = dynamic(() => import("@/components/post/wysiwyg"), { ssr: false });

interface Props {
  post: PostType;
  viewport: ViewportType;
};

const EditPost = ({ post, viewport }: Props) => {
  const router = useRouter();

  const subCategoryList = subCategoryListMap[post.mainCategory].filter(
    (item: SubCategoryKoreanType) => item !== "All"
  );

  const [currentCategory, setCurrentCategory] = useState<string>(post.subCategory);

  const wysiwygRef = useRef<any>(null);

  const { register, handleSubmit, setValue } = useForm({ mode: "onChange" });

  const { openModal, closeModal } = useModal();

  const editPostMutation = useEditPost(post.mainCategory, post._id);

  useEffect(() => {
    setValue("title", post.title);
  }, []);

  const handleClickBack = (): void => {
    router.push(`/bbs/${post.mainCategory}/post/${post._id}`);
  };

  const submitHandler = {
    onSubmit: async (watch: Record<string, string>): Promise<void> => {
      const editor = wysiwygRef.current.getEditor();
      const parser = new DOMParser();
      const parsedContent = parser.parseFromString(editor.root.innerHTML, "text/html");
      const imgTagList = Array.from(parsedContent.querySelectorAll("img"));

      const uploadPromises = imgTagList.map(async (imgTag) => {
        const src = imgTag.getAttribute("src");

        if (src?.startsWith("data:")) {
          const blob = dataURLToBlob(src);
          const fileName = Date.now().toString();
          const StorageURL = await uploadImageToFirebase(`bbs/${post.mainCategory}/${fileName}`, blob);

          imgTag.setAttribute("src", StorageURL || "");
        }
      });

      await Promise.all(uploadPromises);

      const requestBody = {
        subCategory: currentCategory,
        title: watch.title,
        content: parsedContent.body.innerHTML,
      };

      editPostMutation.mutate(requestBody);
    },
    onError: (error: any): void => {
      error.title && openModal("alert", error.title.message, closeModal);
    },
  };

  return (
    <form onSubmit={handleSubmit(submitHandler.onSubmit, submitHandler.onError)} className={styles["container"]}>
      {viewport === "mobile" && (
        <div className={styles["action-box--mobile"]}>
          <GoArrowLeft
            size={25}
            color="#2C2C2C"
            onClick={handleClickBack}
            style={{
              marginRight: "auto",
            }}
          />
          <span className={styles["title--mobile"]}>글수정</span>
          <button className={styles["submit-button--mobile"]}>수정</button>
        </div>
      )}
      <div className={styles["header"]}>
        <input
          {...register("title", { required: "제목을 입력해주세요." })}
          placeholder="제목을 입력하세요."
          spellCheck="false"
          className={styles["title-input"]}
        />
        <div className={styles["header__information"]}>
          <div className={styles["header__writer-box"]}>
            <span className={styles["header__writer"]}>{post?.writer.nickname}</span>
          </div>
          <div className={styles["header__sub-category-box"]}>
            <span className={styles["header__division"]}>분류</span>
            <div className={styles["header__division-boundary-line"]}></div>
            {subCategoryList.map((value: string, index: number) => (
              <span
                key={index}
                onClick={() => setCurrentCategory(value)}
                className={`${
                  currentCategory === value
                    ? styles["header__division-value--selected"]
                    : styles["header__division-value"]
                }`}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles["content"]}>
        <Wysiwyg wysiwygRef={wysiwygRef} initialContent={post.content} />
      </div>
      {viewport !== "mobile" && (
        <div className={styles["button-box"]}>
          <span className={styles["cancel-button"]}>취소</span>
          <button type="submit" className={styles["submit-button"]}>
            등록
          </button>
        </div>
      )}
      <ModalContainer />
    </form>
  );
};

export default EditPost;
