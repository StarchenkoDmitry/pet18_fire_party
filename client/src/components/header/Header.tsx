import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

export default function Header() {

    return (
        <header className={styles.header} >
            <a href="/">Online Chat</a>
            <Link to='/'>Home</Link>
            
            <Link to='/me'>Me</Link>
            {/* <Link href='/chat'>Me</Link>
            <Link href='/me'>Me</Link> */}
            {/* <Link href='/home'>Home</Link>
            <Link href='/profile'>Profile</Link> */}
        </header>
    );
}
