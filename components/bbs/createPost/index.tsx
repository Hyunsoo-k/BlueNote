import { useRouter } from "next/router";
import React, { useState, useRef, memo } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";

import { MainCategory } from "@/types/categorys";
import { useGetUserQuery } from "@/hooks/user/useGetUserQuery";
import { subCategoryListMap } from "@/variable";
import { useCreatePost } from "@/hooks/bbs/useCreatePost";
import { uploadImageToFirebase, dataURLToBlob } from "@/utils/firebase";

import styles from "./index.module.scss";

import "react-quill/dist/quill.snow.css";

const Wysiwyg = memo(dynamic(() => import("@/components/bbs/wysiwyg"), { ssr: false }));

interface Props {
  mainCategory: MainCategory;
  viewport: string;
};

const CreatePost = ({ mainCategory, viewport }: Props) => {
  const router = useRouter();

  const subCategoryList = subCategoryListMap[mainCategory].filter((item) => item !== "All");

  const [currentCategory, setCurrentCategory] = useState<string>(subCategoryList[0]);

  const wysiwygRef = useRef<any>(null);

  const { data: userMe } = useGetUserQuery();

  const createPostMutation = useCreatePost(mainCategory);

  const { register, handleSubmit } = useForm({ mode: "onChange" });

  const handleClickBack = () => {
    router.push(`/bbs/${mainCategory}`);
  };

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
        content: parsedContent.body.innerHTML,
      };

      createPostMutation.mutate(requestBody);
    },
    onError: (error: any) => {
      console.log(error);
    },
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler.onSubmit, submitHandler.onError)}
      className={styles["container"]}
    >
      {viewport === "mobile" && (
        <div className={styles["action-box--mobile"]}>
          <GoArrowLeft
            size={25}
            color="#2C2C2C"
            onClick={handleClickBack}
            style={{
              marginRight: "auto"
            }}
          />
          <span className={styles["title--mobile"]}>글쓰기</span>
          <button className={styles["submit-button--mobile"]}>등록</button>
        </div>
      )}
      {viewport !== "mobile" && (
        <p className={styles["main-category"]}>
          {mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1)}
        </p>
      )}
      <div className={styles["header"]}>
        <input
          {...register("title", { required: "필수 값 입니다." })}
          placeholder="제목을 입력하세요."
          spellCheck="false"
          className={styles["title-input"]}
        />
        <div className={styles["header__information"]}>
          <div className={styles["header__writer-box"]}>
            <span className={styles["header__writer"]}>작성자</span>
            <span className={styles["header__writer-value"]}>
              {userMe?.nickname}
            </span>
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
        <Wysiwyg wysiwygRef={wysiwygRef} />
      </div>
      {viewport !== "mobile" && (
        <div className={styles["button-box"]}>
          <span className={styles["cancel-button"]}>취소</span>
          <button type="submit" className={styles["submit-button"]}>
            등록
          </button>
        </div>
      )}
    </form>
  );
};

export default CreatePost;
