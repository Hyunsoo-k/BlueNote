import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";

import { formatYMD } from "@/utils/dateFormatter";
import { useGetUser } from "@/hooks/auth/useGetUser";
import { useEditUser } from "@/hooks/myPage/useEditUser";
import { uploadImageToFirebase, deleteImageFromFirebase } from "@/utils/firebase";
import MyPageMenu from "@/components/myPageMenu";
import ModalContainer from "@/components/modal/modalContainer";

import styles from "./index.module.scss";

const UserPage = () => {
  const { data: userMe } = useGetUser();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    setValue("nickname", userMe?.nickname);
    setValue("email", userMe?.email);
    setValue("profileImage", {
      initialUrl: userMe?.profileImage.url,
      editedUrl: userMe?.profileImage.url,
      newFile: null,
    });
    setValue("part", userMe?.part);
  }, [userMe]);

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    const blobUrl = URL.createObjectURL(file);
    setValue("profileImage", {
      initialUrl: userMe?.profileImage.url,
      editedUrl: blobUrl,
      newFile: file,
    });
  };

  const handleImageReset = () => {
    setValue("profileImage", {
      initialUrl: userMe?.profileImage.url,
      editedUrl: null,
      newFile: null,
    });
  };

  const editUserMutation = useEditUser();

  const submitHandler = {
    onSubmit: async (formData: any) => {
      const {
        nickname,
        part,
        profileImage: { initialUrl, editedUrl, newFile },
      } = formData;
      let imageUrl = userMe?.profileImage.url;
      let fileName = userMe?.profileImage.fileName;

      if (initialUrl === null) {
        if (editedUrl !== null) {
          fileName = Date.now().toString();
          imageUrl = await uploadImageToFirebase(`user/${fileName}`, newFile);
          console.log(imageUrl);
        }
      }

      if (initialUrl !== null) {
        if (editedUrl === null) {
          await deleteImageFromFirebase(`user/${userMe?.profileImage.fileName}`);
          imageUrl = null;
          fileName = null;
        } else if (editedUrl !== null && editedUrl !== initialUrl) {
          await deleteImageFromFirebase(`user/${userMe?.profileImage.fileName}`);
          fileName = Date.now().toString();
          imageUrl = await uploadImageToFirebase(`user/${fileName}`, newFile);
        }
      }

      const requestBody = {
        profileImage: {
          url: imageUrl,
          fileName,
        },
        nickname: nickname,
        part: part,
      };

      editUserMutation.mutate(requestBody);
    },
    onError: (error: any) => {
      console.log(error);
    },
  };

  return (
    <div className={styles["user-page"]}>
      <MyPageMenu currentPage="내 정보" />
      <div
        onSubmit={handleSubmit(submitHandler.onSubmit, submitHandler.onError)}
        className={styles["user-page__content"]}
      >
        <h1 className={styles["user-page__title"]}>내 정보</h1>
        <form className={styles["user-page__form"]}>
          <div className={styles["user-page__image-section"]}>
            {watch("profileImage")?.editedUrl ? (
              <Image
                src={watch("profileImage").editedUrl}
                width={210}
                height={210}
                style={{ borderRadius: "4px" }}
                alt=""
              />
            ) : (
              <div className={styles["user-page__image-field"]}>
                <LuPlus size={50} color="#fff" style={{ position: "absolute", top: "38%", left: "38%" }} />
                <input
                  {...register("profileImage", {
                    onChange: handleImageUpload,
                  })}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles["user-page__image-input"]}
                />
              </div>
            )}
            <button type="button" onClick={handleImageReset} className={styles["user-page__image-reset-button"]}>
              이미지 초기화
            </button>
          </div>
          <div className={styles["user-page__data"]}>
            <p className={styles["user-page__createdAt"]}>
              가입일<span>{userMe?.createdAt && formatYMD(userMe.createdAt)}</span>
            </p>
            <p className={styles["user-page__email"]}>
              이메일<span>{userMe?.email}</span>
            </p>
            <div className={styles["user-page__nickname-field"]}>
              <p className={styles["user-page__nickname-label"]}>닉네임</p>
              <input
                {...register("nickname", {
                  required: "닉네임을 입력해 주세요.",
                  minLength: { value: 2, message: "닉네임은 2글자 이상이어야 합니다." },
                  maxLength: { value: 7, message: "닉네임은 7글자 이하이어야 합니다." },
                })}
                defaultValue={userMe?.nickname}
                autoComplete="off"
                className={styles["user-page__nickname-input"]}
              />
              {errors.nickname && <span className={styles["user-page__error-message"]}>{errors.nickname.message}</span>}
            </div>
            <div className={styles["user-page__part-field"]}>
              <p className={styles["user-page__part"]}>분야</p>
              <select {...register("part")} defaultValue={userMe?.part} className={styles["user-page__part-select"]}>
                <option value="-">-</option>
                <option value="Vocalist">Vocalist</option>
                <option value="Pianist">Pianist</option>
                <option value="Bassist">Bassist</option>
                <option value="Guitarist">Guitarist</option>
                <option value="Drummer">Drummer</option>
                <option value="Saxophonist">Saxophonist</option>
                <option value="Trumpeter">Trumpeter</option>
                <option value="Trombonist">Trombonist</option>
                <option value="Clarinetist">Clarinetist</option>
                <option value="Owner">Owner</option>
                <option value="Listener">Listener</option>
              </select>
            </div>
          </div>
          <button className={styles["user-page__submit-button"]}>저장</button>
        </form>
      </div>
      <ModalContainer />
    </div>
  );
};

export default UserPage;