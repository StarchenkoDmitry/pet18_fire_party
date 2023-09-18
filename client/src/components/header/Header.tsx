import Link from "next/link";
import styles from "./Header.module.scss";


export default function Header() {

    return (
        <header className={styles.header} >
            <a href="/">Online Chat</a>
            <Link href='/home'>Home</Link>
            <Link href='/profile'>Profile</Link>
        </header>
    );
}
