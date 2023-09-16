import styles from "./MainLayout.module.scss";

import {  ReactNode } from "react";

interface Props{
    children: ReactNode;
}

export default function MainLayout({children}:Props) {
    return (
        <div className={styles.container}>
            { children }
        </div>
    );
}
 

// const MainLayout :FC<Props>= ({children})=> {
//     return (<div>
//         <Header/>
//         { children }
//     </div>);
// }

// export default MainLayout;
