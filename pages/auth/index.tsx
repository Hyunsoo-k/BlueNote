import AuthCard from "@/components/authCard";
import styles from "./index.module.scss";

const AuthPage = () => {
  return (
    <div className={styles["auth-page"]}>
      <AuthCard />
    </div>
  );
};

export default AuthPage;
