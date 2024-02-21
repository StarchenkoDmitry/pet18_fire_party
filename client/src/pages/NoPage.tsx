import { useParams } from "react-router-dom";
import styles from "./NoPage.module.scss";

export default function NoPage() {
    const params = useParams();
    const path = params["*"] || "";

    return <div className={styles.page}>Page '/{path}' not found.</div>;
}
