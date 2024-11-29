import { useFormContext } from "react-hook-form";

import styles from "./index.module.scss";

const Email = () => {
  const { register, formState: { errors }, } = useFormContext();

  return (
    <div className={styles["email"]}>
      <input
        placeholder="Email"
        autoComplete="off"
        {...register("email", {
          required: "필수 값 입니다.",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "이메일 형식에 맞지 않습니다",
          },
        })}
      />
      {errors?.email &&
        <span>
          {typeof errors.email.message === "string" ? errors.email.message  : ""}
        </span>
      }
    </div>
  );
};

export default Email;
