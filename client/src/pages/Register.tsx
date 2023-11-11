import RegisterScreen from "@/components/screens/register/RegisterScreen";
import styles from "./Register.module.scss"

export default function Register() {
  return (
    <div className={styles.page}>
      <RegisterScreen/>
    </div>
  );
}
