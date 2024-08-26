import { useRouter } from "next/router";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { PiVinylRecordFill } from "react-icons/pi";

import { useSignIn } from "@/hooks/auth/useSignIn";
import { useSignUp } from "@/hooks/auth/useSignUp";
import Email from "../input/email";
import Nickname from "../input/nickname";
import Password from "../input/password";
import CheckPassword from "../input/check-password";

import styles from "./index.module.scss";

// 운영자 ID : bluenote@bluenote.com
// 운영자 PW : admin56036

interface CurrentForm {
  initial: boolean,
  form: "signIn" | "signUp"
}

const AuthCard = () => {
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState<CurrentForm>({
    initial: true,
    form: "signIn",
  });

  const currentFormHandler = () => {
    setCurrentForm((prev) => ({
      ...prev,
      initial: false,
      form: prev.form === "signIn" ? "signUp" : "signIn",
    }));
  };

  useEffect(() => {
    setCurrentForm((prev: CurrentForm) => ({ ...prev, form: router.query.initial as "signIn" | "signUp" }));
  }, [router.query.initial]);

  const formTools = useForm({ mode: "onChange" });

  const signInHandler = useSignIn();
  const signUpHandler = useSignUp();

  const submitHandler = {
    onSubmit: (data: any) => {
      currentForm.form === "signIn" ? signInHandler.mutate(data) : signUpHandler.mutate(data);
    },
    onError: (e: any) => {
      console.log(e);
    },
  };
  
  const formImg = ["/images/carousel/playing-trumpet.png", "/images/auth/saxophone.png"];

  return (
    <div className={styles["auth-card"]}>
      {formImg.map((item: string, index: number) => (
        <div className={styles["auth-card__section"]} key={index}>
          <p>
            Blue Note
            <PiVinylRecordFill size={30} style={{ position: "relative", top: "5px", left: "5px" }} />
          </p>
          <p>community for jazz musicians</p>
          <div className={styles["img"]}>
            <Image src={formImg[index]} fill alt="" />
          </div>
          <p>{item === "signIn" ? "have an account?" : "don't have an account?"}</p>
          <p onClick={currentFormHandler}>{item === "signIn" ? "Login" : "Sign Up"}</p>
        </div>
      ))}
      <FormProvider {...formTools}>
        <form
          onSubmit={formTools.handleSubmit(submitHandler.onSubmit, submitHandler.onError)}
          className={styles[`auth-card__${currentForm.form}`]}
          style={currentForm.initial ? { animationName: "none" } : {}}
        >
          <p>{currentForm.form === "signIn" ? "Login" : "Sign Up"}</p>
          <div className={styles["auth-card__input-box"]}>
            <Email />
            {currentForm.form === "signUp" && <Nickname />}
            <Password />
            {currentForm.form === "signUp" && <CheckPassword />}
            <button className={styles["btn"]}>{currentForm.form === "signIn" ? "Login" : "Sign Up"}</button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AuthCard;
