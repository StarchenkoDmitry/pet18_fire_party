'use client'
import { FormEvent, useState } from "react";
import styles from "./Authorization.module.scss";
import { Register } from "../actions/Actions";

export default function Authorization() {
    const [registering,setRegistering] = useState(false);
    
    const onsubmit = async (event: FormEvent<HTMLFormElement>)=>{
        setRegistering(true);
        event.preventDefault();
        event.stopPropagation();
        const target = event.target as any;

        const login = target.login.value;        
        const email = target.email.value;
        const password = target.password.value;

        console.log(login,email,password);

        const registered = await Register({login,email,password});
        
        setRegistering(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.authform}>
                <form onSubmit={ onsubmit} method="POST">                    
                    <label htmlFor="login">Login</label><br/>
                    <input name="login"></input><br/>

                    <label htmlFor="email">Email</label><br/>
                    <input name="email"></input><br/>

                    <label htmlFor="password">Password</label><br/>
                    <input name="password"></input><br/><br/>

                    <button type="submit" className={styles.btn_submit}>Register</button>
                </form>
            </div>
        </div>       
    )
}