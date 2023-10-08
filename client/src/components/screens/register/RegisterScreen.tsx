import { FormEvent, useState } from "react";
import styles from "./RegisterScreen.module.scss";
import { RandomEmail, RandomLogin, RandomName, RandomPassword } from "@/utils/Randomer";
import { useNavigate } from "react-router-dom";
import { Register } from "@/actions/Auth.actions";


export default function RegisterScreen() {
    const navigate = useNavigate();

    const [registering,setRegistering] = useState(false);
    
    
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

        setRegistering(true);

        const target = event.target as any;

        const login = target.login.value;
        const email = target.email.value;
        const password = target.password.value;

        const name = target.name.value;
        const surname = target.surname.value;
        

        console.log(login,email,password);
        
        const data = {
            login,
            email,
            password,
            name,
            surname};
        console.log('data: ',data);

        const registered = await Register(data);
        console.log("registered: ",registered);

        
        if(registered){
            navigate("/");
        }
        setRegistering(false);
    }



    return (
        <div className={styles.container}>
            <div className={styles.registerform}>
                <form onSubmit={onsubmit} method="POST" action="/">
                    <h1>Sign Up</h1>

                    <label htmlFor="login">Login</label>
                    <input onChange={(e)=>setLogin(e.target.value)}
                    name="login" value={login}></input>

                    <label htmlFor="email">Email</label>
                    <input onChange={(e)=>setEmail(e.target.value)}
                    name="email" type="email" value={email}></input>

                    <label htmlFor="password">Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)}
                    name="password" type="password" value={password}></input>

                    
                    <label htmlFor="name">Name</label>
                    <input onChange={(e)=>setName(e.target.value)}
                    name="name" value={name}></input>

                    <label htmlFor="surname">Surname</label>
                    <input onChange={(e)=>setSurname(e.target.value)}
                    name="surname" value={surname}></input>

                    <button className={styles.btn_submit} type="submit"
                    disabled={registering}>Register</button>                    
                </form>
                {/* <button onClick={randomchik}>Random</button> */}
            </div>
        </div>       
    )
}