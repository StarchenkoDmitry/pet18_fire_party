// 'use client'
import { FormEvent, useState } from "react";
import styles from "./Authorization.module.scss";
import { Register } from "../actions/Actions";
import { RandomEmail, RandomLogin, RandomName, RandomPassword } from "@/utils/Randomer";
import { useNavigate } from "react-router-dom";


export default function Authorization() {
    const [registering,setRegistering] = useState(false);
    
    const navigate = useNavigate();

    
    const [login,setLogin] = useState(()=>RandomLogin());
    const [email,setEmail] = useState(()=>RandomEmail());
    const [password,setPassword] = useState(()=>RandomPassword());
    const [name,setName] = useState(()=>RandomName());
    const [surname,setSurname] = useState(()=>RandomName());

    const randomchik = ()=>{
        setEmail(RandomEmail());
    }
       
    const onsubmit = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        // event.stopPropagation();        

        setRegistering(true);

        const target = event.target as any;

        const login = target.login.value;
        const email = target.email.value;
        const password = target.password.value;

        const name = target.name.value;
        const surname = target.surname.value;

        // const login = "",name = "",surname = "";

        console.log(login,email,password);
        
        const data = {login,email,password,name,surname};
        console.log('data: ',data);

        const registered = await Register(data);
        console.log("registered: ",registered);

        
        if(registered){
            navigate("/me");        
        }
        setRegistering(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.authform}>                
                <form onSubmit={onsubmit} method="POST" action="/">

                    <label htmlFor="login">Login</label><br/>
                    <input name="login" defaultValue={login}></input><br/>

                    <label htmlFor="email">Email</label><br/>
                    <input name="email" type="email" defaultValue={email}></input><br/>

                    <label htmlFor="password">Password</label><br/>
                    <input name="password" type="password" defaultValue={password}></input><br/>

                    
                    <label htmlFor="name">Name</label><br/>
                    <input name="name" defaultValue={name}></input><br/>
                    <label htmlFor="surname">Surname</label><br/>
                    <input name="surname" defaultValue={surname}></input><br/><br/>

                    <button disabled={registering} type="submit" className={styles.btn_submit}>Register</button>
                </form>
                <button onClick={randomchik}>Random</button>
            </div>
        </div>       
    )
}