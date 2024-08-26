import { useFormContext } from "react-hook-form";

import styles from "./index.module.scss";

const CheckPassword = () => {
  const { register, formState: { errors }, watch } = useFormContext();

  return (
    <div className={styles["check-password"]}>
      <input
        placeholder="Check Password"
        type="password"
        {...register("checkPassword", {
          required: "필수 값 입니다.",
          validate: (field: string) => {
            return !field
              ? "필수 값 입니다."
              : field.length > 0 &&
                  field ===
                    watch("password")
                ? undefined
                : "비밀번호가 일치하지 않습니다";
          }
        })}
      />
      {errors?.checkPassword && <span>{errors.checkPassword.message}</span>}
    </div>
  );
};

export default CheckPassword;
