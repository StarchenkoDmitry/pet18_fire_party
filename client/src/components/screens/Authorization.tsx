'use client'
import { FormEvent, useState } from "react";
import styles from "./Authorization.module.scss";
import { Register } from "../actions/Actions";
import { RandomEmail } from "@/utils/Randomer";

export default function Authorization() {
    const [registering,setRegistering] = useState(false);
    const [email,setEmail] = useState('');
    const [login,setLogin] = useState('');

    const randomchik = ()=>{
        setEmail(RandomEmail());
    }
       
    const onsubmit = async (event: FormEvent<HTMLFormElement>)=>{
        setRegistering(true);
        // event.preventDefault();
        // event.stopPropagation();
        const target = event.target as any;

        const login = target.login.value;        
        const email = target.email.value;
        const password = target.password.value;

        console.log(login,email,password);
        
        const data = {login,email,password};
        console.log('data: ',data);

        const registered = await Register(data);
        console.log("registered: ",registered);
        
        setRegistering(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.authform}>                
                <form onSubmit={ onsubmit} method="POST">

                    <label htmlFor="login">Login</label><br/>
                    <input name="login"></input><br/>

                    <label htmlFor="email">Email</label><br/>
                    <input name="email" 
                    // defaultValue={RandomEmail()}
                    // onChange={()=>{setEmail(RandomEmail())}}
                    value={email}
                    ></input><br/>

                    <label htmlFor="password">Password</label><br/>
                    <input name="password"></input><br/>

                    
                    <label htmlFor="name">Name</label><br/>
                    <input name="name"></input><br/>
                    <label htmlFor="surname">Surname</label><br/>
                    <input name="surname"></input><br/><br/>

                    <button disabled={registering} type="submit" className={styles.btn_submit}>Register</button>
                </form>
                <button onClick={randomchik}>Random</button>
            </div>
        </div>       
    )
}