import { GetServerSideProps } from "next";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { instance } from "@/axios";
import { getCookie } from "@/cookie";
import { formatYMD } from "@/utils/dateFormatter";
import MyPageMenu from "@/components/myPageMenu";

import styles from "./index.module.scss";

interface ServerSideProps {
  user: any;
}

const UserPage = ({ user }: ServerSideProps) => {
  console.log(user);
  const { register, handleSubmit, watch } = useForm({ mode: "onChange" });

  const submitHandler = {
    onSubmit: (data: any) => {
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    }
  }

  return (
    <div className={styles["user-page"]}>
      <MyPageMenu currentPage="" />
      <div className={styles["user-page__content"]}>
        <h1 className={styles["user-page__title"]}>내 정보</h1>
        <div className={styles["user-page__data"]}>
          <div className={styles["user-page__img"]}>
            <Image src="/images/carousel/playing-trumpet.png" width={210} height={210} alt="" style={{ borderRadius: "8px" }} />
          </div>
          <form className={styles["user-page__form"]}>
            <p className={styles["user-page__createdAt"]}>가입일<span>{formatYMD(user.createdAt)}</span></p>
            <p className={styles["user-page__email"]}>이메일<span>{user.email}</span></p>
            <p className={styles["user-page__nickname"]}>닉네임<span>{user.nickname}</span><span className={styles["user-page__edit"]}>변경</span></p>
            <p className={styles["user-page__part"]}>분야<span>Guitar</span><span className={styles["user-page__edit"]}>변경</span></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken } = context.req.cookies;

  const { data } = await instance.get("/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return {
    props: {
      user: data
    }
  }
}
