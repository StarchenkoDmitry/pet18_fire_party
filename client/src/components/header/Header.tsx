import Link from "next/link";
import styles from "./Header.module.scss";


export default function Header() {

    return (
        <header className={styles.header} >
            <a href="/">Online Chat</a>
            <Link href='/'>Home</Link>
            
            <Link href='/me'>Me</Link>
            {/* <Link href='/chat'>Me</Link>
            <Link href='/me'>Me</Link> */}
            {/* <Link href='/home'>Home</Link>
            <Link href='/profile'>Profile</Link> */}
        </header>
    );
}
