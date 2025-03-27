import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";

import { useGetViewport } from "@/hooks/viewport";
import useModal from "@/hooks/modal/useModal";
import { useGetUserQuery } from "@/hooks/user/useGetUserQuery";
import { useEditUser } from "@/hooks/myPage/useEditUser";
import { formatYMD } from "@/utils/dateFormatter";
import { uploadImageToFirebase, deleteImageFromFirebase } from "@/utils/firebase";
import MyPageMenu from "@/components/myPageMenu";
import ModalContainer from "@/components/modal/modalContainer";

import styles from "./index.module.scss";

const UserPage = () => {
  const { data: userMe } = useGetUserQuery();

  const viewport = useGetViewport();
  const { openModal, closeModal } = useModal();

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
      initialUrl: userMe?.profileImageUrl,
      editedUrl: userMe?.profileImageUrl,
      newFile: null,
    });
  }, [userMe]);

  const handleImageUpload = (e: any): void => {
    const file = e.target.files[0];
    const blobUrl = URL.createObjectURL(file);

    setValue("profileImage", {
      initialUrl: userMe?.profileImageUrl,
      editedUrl: blobUrl,
      newFile: file,
    });
  };

  const handleImageReset = (): void => {
    setValue("profileImage", {
      initialUrl: userMe?.profileImageUrl,
      editedUrl: null,
      newFile: null,
    });
  };

  const editUserMutation = useEditUser();

  const submitHandler = {
    onSubmit: async (watch: Record<string, string | any>): Promise<void> => {
      const {
        nickname,
        profileImage: { initialUrl, editedUrl, newFile },
        newPassword,
        checkNewPassword
      } = watch;

      let imageUrl: string | null = userMe.profileImageUrl || null;
      let fileName: string | null = userMe.profileImageUrl || null;

      if (initialUrl === null && editedUrl !== null) {
        fileName = Date.now().toString();
        imageUrl = await uploadImageToFirebase(`user/${fileName}`, newFile);
      };

      if (initialUrl !== null) {
        if (editedUrl === null) {
          await deleteImageFromFirebase(`user/${userMe?.profileImageUrl}`);

          imageUrl = null;
          fileName = null;
        } else if (editedUrl !== null && editedUrl !== initialUrl) {
          await deleteImageFromFirebase(`user/${userMe?.profileImageUrl}`);
          
          fileName = Date.now().toString();
          imageUrl = await uploadImageToFirebase(`user/${fileName}`, newFile);
        };
      };

      if (newPassword !== checkNewPassword) {
        return openModal("alert", "비밀번호가 일치하지 않습니다", closeModal);
      };

      const requestBody = {
        nickname: nickname,
        ...(initialUrl !== editedUrl && {
          profileImageUrl : editedUrl
        }),
        ...(newPassword && { newPassword })
      };

      editUserMutation.mutate(requestBody);
    },
    onError: (error: any) => {
      console.log(error);
    },
  };

  return (
    <div className={styles["page-component"]}>
      {viewport !== "mobile" && (
        <MyPageMenu currentPage="내 정보" />
      )}
      <div className={styles["main"]}>
        <h1 className={styles["title"]}>내 정보</h1>
        <form onSubmit={handleSubmit(submitHandler.onSubmit, submitHandler.onError)}>
          <div className={styles["image-section"]}>
            {watch("profileImage")?.editedUrl ? (
              <Image
                src={watch("profileImage").editedUrl}
                width={viewport === "mobile" ? 150 : 210}
                height={viewport === "mobile" ? 150 : 210}
                style={{ borderRadius: "4px" }}
                alt=""
              />
            ) : (
              <div className={styles["image-field"]}>
                <LuPlus
                  size={50}
                  color="#fff"
                  style={{
                    position: "absolute",
                    top: "38%",
                    left: "38%"
                  }}
                />
                <input
                  {...register("profileImage", {
                    onChange: handleImageUpload,
                  })}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles["image-input"]}
                />
              </div>
            )}
            <button
              type="button"
              onClick={handleImageReset}
              className={styles["image-reset-button"]}
            >
              이미지 초기화
            </button>
          </div>
          <div className={styles["text-information-section"]}>
            <div className={styles["disable-edit-section"]}>
              <div className={styles["created-at"]}>
                <span>가입일</span>
                <span className={styles["value"]}>
                  {userMe?.createdAt && formatYMD(userMe.createdAt)}
                </span>
              </div>
              <div className={styles["email"]}>
                <span>이메일</span>
                <span className={styles["value"]}>
                  {userMe?.email}
                </span>
              </div>
            </div>
            <div className={styles["able-edit-section"]}>
              <div className={styles["nickname"]}>
                <span>닉네임</span>
                <input
                  {...register("nickname", {
                    required: "닉네임을 입력해 주세요.",
                    minLength: {
                      value: 2, message: "닉네임은 2글자 이상이어야 합니다."
                    },
                    maxLength: {
                      value: 7,
                      message: "닉네임은 7글자 이하이어야 합니다."
                    },
                  })}
                  defaultValue={userMe?.nickname}
                  autoComplete="off"
                />
                {errors.nickname && (
                  <span className={styles["error-message"]}>
                    {typeof errors.nickname.message === "string" ? errors.nickname.message : ""}
                  </span>
                )}
              </div>
              <div className={styles["password"]}>
                <div className={styles["new-password"]}>
                  <span>새 비밀번호</span>
                  <input
                    {...register("newPassword" , {
                      validate: (value: string) => {
                        if (value.length > 0 && (value.length < 7 || value.length > 15)) {
                          return "비밀번호는 7자 이상 15자 이하로 입력해야 합니다.";
                        };

                        return true;
                      }
                    })}
                    type="password"
                  />
                  {errors.newPassword && (
                    <span className={styles["error-message"]}>
                      {typeof errors.newPassword.message === "string" ? errors.newPassword.message : ""}
                    </span>
                  )}
                </div>
                <div className={styles["check-new-password"]}>
                  <span>비밀번호 확인</span>
                  <input
                    {...register("checkNewPassword", {
                      validate: (value: string) => {
                        if (value.length > 0 && (value.length < 7 || value.length > 15)) {
                          return "비밀번호는 7자 이상 15자 이하로 입력해야 합니다.";
                        };

                        return true;
                      }
                    })}
                    type="password"
                  />
                  {errors.checkNewPassword && (
                    <span className={styles["error-message"]}>
                      {typeof errors.checkNewPassword.message === "string" ? errors.checkNewPassword.message : ""}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button className={styles["submit-button"]}>저장</button>
        </form>
      </div>
      <ModalContainer />
    </div>
  );
};

export default UserPage;
