import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { MouseEvent, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { IoMdHome } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";

import { PostType } from "@/types/post/post";
import { useGetViewport } from "@/hooks/viewport";
import { subCategoryListMap } from "@/variable";
import { SubCategoryKoreanType } from "@/types/category/categorys";
import { dataURLToBlob, uploadImageToFirebase } from "@/utils/firebase";
import useModal from "@/hooks/modal/useModal";
import { useGetPostQuery } from "@/hooks/bbs/useGetPostQuery";
import { useEditPost } from "@/hooks/bbs/useEditPost";
import Aside from "@/components/aside/aside";
import ModalContainer from "@/components/modal/modalContainer";

import styles from "./index.module.scss";

const Wysiwyg = dynamic(() => import("@/components/post/wysiwyg"), { ssr: false });

interface Props {
  urlWithoutQuery: string;
  initialData: PostType;
};

const EditPostPageLayout = ({ urlWithoutQuery, initialData }: Props) => {
  const router = useRouter();

  const [currentSubCategory, setCurrentSubCategory]
    = useState<SubCategoryKoreanType>(initialData.subCategory);

  const wysiwygRef = useRef<any>(null);

  useEffect(() => {
    setValue("title", initialData.title);
  }, []);

  const viewport = useGetViewport();

  const { openModal, closeModal } = useModal();

  const { data: queryData }
    = useGetPostQuery(`/bbs/${initialData.mainCategory}/post/${initialData._id}`, initialData);

  const useEditPostMutation = useEditPost(initialData.mainCategory, initialData._id);

  const {
    register,
    handleSubmit,
    setValue
  } = useForm({ mode: "onChange" });

  const subCategoryList = subCategoryListMap[initialData.mainCategory];
  
  const SubCategoryListWithoutAll
  = subCategoryList.filter(
    (subCategory: SubCategoryKoreanType) => subCategory !== "All"
  );

  const hendleClickSubCategory = (
    e: MouseEvent<HTMLSpanElement>,
    subCategory: SubCategoryKoreanType
  ): void => {
    e.stopPropagation();

    setCurrentSubCategory(subCategory);
  };

  const handleClickCancel = (): void => {
    openModal(
      "confirm",
      "게시글 수정을 취소하시겠습니까?",
      () => {
        closeModal();
        router.push(`/bbs/${initialData.mainCategory}`);
      }
    );
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
          const StorageURL
            = await uploadImageToFirebase(`bbs/${initialData.mainCategory}/${fileName}`, blob);

          imgTag.setAttribute("src", StorageURL || "");
        };
      });

      await Promise.all(uploadPromises);

      const requestBody = {
        subCategory: currentSubCategory,
        title: watch.title,
        content: parsedContent.body.innerHTML,
      };

      useEditPostMutation.mutate(requestBody);
    },
    onError: (error: any): void => {
      error.title && openModal("alert", error.title.message, closeModal);
    },
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler.onSubmit, submitHandler.onError)}
      className={styles["component"]}
    >
      <div className={styles["main"]}>
        <div className={styles["header"]}>
          <div className={styles["bread__crumbs"]}>
            <span>
              <IoMdHome
                size={viewport === "mobile" ? 14 : 16}
                color="#2C2C2C"
                style={{
                  position: "relative",
                  top: "2px",
                  marginRight: "3px",
                }}
              />
              홈
            </span>
            <MdKeyboardArrowRight
              size={20}
              color="rgb(138, 131, 131)"
              style={viewport === "mobile" ? { position: "relative", top: "1px" } : {}}
            />
            <span>{queryData.mainCategory.toUpperCase()}</span>
            <MdKeyboardArrowRight
              size={20}
              color="rgb(138, 131, 131)"
              style={viewport === "mobile" ? { position: "relative", top: "1px" } : {}}
            />
            <span>게시글 수정</span>
          </div>
          <input
            {...register("title", { required: "제목을 입력해주세요." })}
            placeholder="제목을 입력하세요."
            spellCheck="false"
            className={styles["title-input"]}
          />
          <div className={styles["post-information"]}>
            <div className={styles["writer-wrapper"]}>
              <span>작성자</span>
              <span className={styles["writer"]}>{queryData.writer.nickname}</span>
            </div>
            <div className={styles["sub-category-wrapper"]}>
              <span>분류</span>
              <div className={styles["boundary-line"]}></div>
              {SubCategoryListWithoutAll.map((subCategory: SubCategoryKoreanType, index: number) => (
                <span
                  key={index}
                  onClick={(e) => hendleClickSubCategory(e, subCategory)}
                  className={
                    styles[`${currentSubCategory === subCategory
                      ? "sub-category--selected"
                      : "sub-category"
                    }`]
                  }
                >{subCategory}</span>
              ))}
            </div>
            <div className={styles["action-button-wrapper"]}>
              <button
                type="button"
                onClick={handleClickCancel}
              >
                취소
              </button>
              <button
                type="submit"
                className={styles["submit-button"]}
              >
                수정
              </button>
            </div>
          </div>
        </div>
        <div className={styles["wysiwtg-wrapper"]}>
          <Wysiwyg wysiwygRef={wysiwygRef} initialContent={initialData.content} />
        </div>
      </div>
      {viewport !== "mobile" && (
        <div className={styles["aside"]}>
          <Aside />
        </div>
      )}
    <ModalContainer />
    </form>
  );
};

export default EditPostPageLayout;