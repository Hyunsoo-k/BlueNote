import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { PiVinylRecordFill } from "react-icons/pi";

import { useSignIn } from "@/hooks/auth/useSignIn";
import { useSignUp } from "@/hooks/auth/useSignUp";
import Email from "../input/email";
import Nickname from "../input/nickname";
import Password from "../input/password";
import CheckPassword from "../input/check-password";

import styles from "./index.module.scss";
import { ViewportContext } from "@/contexts/viewport";

const AlertModal = dynamic(() => import("../modal/alertModal"), { ssr: false });

interface CurrentForm {
  initial: boolean;
  form: "signIn" | "signUp";
}

const AuthCard = () => {
  const router = useRouter();

  const viewportContext = useContext(ViewportContext);

  const viewport = viewportContext?.viewport || "mobile";


  const [alertModal, setAlertModal] = useState({
    show: false,
    message: "",
    handleClick: null,
  });
  const [currentForm, setCurrentForm] = useState<CurrentForm>({
    initial: true,
    form: "signIn",
  });

  useEffect(() => {
    setCurrentForm((prev: CurrentForm) => ({ ...prev, form: router.query.initial as "signIn" | "signUp" }));
  }, [router.query.initial]);

  const formTools = useForm({ mode: "onChange" });

  const currentFormHandler = () => {
    formTools.reset();
    setCurrentForm((prev) => ({
      ...prev,
      initial: false,
      form: prev.form === "signIn" ? "signUp" : "signIn",
    }));
  };

  const signInMutation = useSignIn(setAlertModal);
  const signUpMutation = useSignUp(setAlertModal, currentFormHandler);

  const submitHandler = {
    onSubmit: (formData: any) => {
      const requestBody = { ...formData };

      currentForm.form === "signIn"
        ? signInMutation.mutate(requestBody)
        : signUpMutation.mutate(requestBody);
    },
    onError: (error: any) => {
      console.error(error);
    },
  };

  const formImg = ["/images/carousel/playing-trumpet.png", "/images/auth/saxophone.png"];

  return (
    <div className={styles["auth-card"]}>
      {formImg.map((item: string, index: number) => (
        <div className={styles["auth-card__section"]} key={index}>
          <p className={styles["auth-card__title"]}>
            Blue Note
              <PiVinylRecordFill
                size={viewport === "mobile" ? 27 : 30}
                style={{ position: "relative", top: "5px", left: "5px" }}
              />
          </p>
          <p className={styles["auth-card__sub-title"]}>community for jazz musicians</p>
          <div className={styles["auth-card__img"]}>
            <Image src={formImg[index]} fill alt="" />
          </div>
          <p className={styles["auto-card__ask"]}>
            {index ? "don't have an account?" : "have an account?"}
          </p>
          <button
            onClick={currentFormHandler}
            className={styles["auth-card__switch-button"]}
          >
            {item === "signIn" ? "Login" : "Sign Up"}
          </button>
        </div>
      ))}
      <FormProvider {...formTools}>
        <form
          onSubmit={formTools.handleSubmit(submitHandler.onSubmit, submitHandler.onError)}
          className={`
            ${styles[`auth-card__form-box`]}
            ${styles[currentForm.form]}
          `}
          style={currentForm.initial ? { animationName: "none" } : {}}
        >
          <p className={styles["auth-card__current-form"]}>
            {currentForm.form === "signIn" ? "Login" : "Sign Up"}
          </p>
          <div className={styles["auth-card__input-list"]}>
            <Email />
            {currentForm.form === "signUp" && <Nickname />}
            <Password />
            {currentForm.form === "signUp" && <CheckPassword />}
            <button className={styles["auth-card__submit-button"]}>
              {currentForm.form === "signIn" ? "Login" : "Sign Up"}
            </button>
          </div>
        </form>
      </FormProvider>
      {alertModal.show && <AlertModal message={alertModal.message} handleClick={alertModal.handleClick} />}
    </div>
  );
};

export default AuthCard;
