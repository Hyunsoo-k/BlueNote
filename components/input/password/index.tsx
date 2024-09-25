import { useFormContext } from "react-hook-form";

import styles from "./index.module.scss";

const Password = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className={styles["password"]}>
      <input
        placeholder="Password"
        type="password"
        {...register("password", {
          required: "필수 값 입니다.",
          minLength: {
            value: 7,
            message: "7자 이상이어야 합니다.",
          },
          maxLength: {
            value: 15,
            message: "15자 이하여야 합니다.",
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,15}$/,
            message: "비밀번호는 영문자와 숫자를 포함해야 합니다.",
          }
        })}
      />
      {errors?.password && <span>{errors.password.message}</span>}
    </div>
  );
};

export default Password;
