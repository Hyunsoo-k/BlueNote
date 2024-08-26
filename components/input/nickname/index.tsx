import { useFormContext } from "react-hook-form";

import styles from "./index.module.scss";

const Nickname = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className={styles["nickname"]}>
      <input
        placeholder="Nickname"
        autoComplete="off"
        {...register("nickname", {
          required: "필수 값 입니다.",
          minLength: {
            value: 2,
            message: "2자 이상이어야 합니다.",
          },
          maxLength: {
            value: 7,
            message: "7자 이하여야 합니다.",
          },
        })}
      />
      {errors?.nickname && <span>{errors.nickname.message}</span>}
    </div>
  );
};

export default Nickname;
