import styles from "./SingUp.module.scss";

import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import {
  RandomEmail,
  RandomLogin,
  RandomName, 
  RandomPassword,
} from "@/utils/Randomer";

import { MAX_NAME_LENGTH } from "@/common/constants";

import { signup } from "@/actions/Auth.actions";


export default function SignUp() {

  const navigate = useNavigate();
  const [running,setRunning] = useState(false)

  const [name,setName] = useState('')
  const [surname,setSurname] = useState('')

  const [login,setLogin] = useState('')
  const [email,setEmail] = useState('')

  const [password,setPassword] = useState('')

  const onSignUp = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    // event.preventDefault()
    
    console.log("onSignUp event : ", event)
    
    if(name.length > MAX_NAME_LENGTH){
      alert(`The name should be no more ${MAX_NAME_LENGTH}`)
      return
    }
    //TODO: дописать проверки на другие поля

    setRunning(true)

    const singupData = {
      name,
      surname,

      login,
      email,

      password,
    }
    console.log("singupData : ",singupData)

    const registered = await signup(singupData)
    console.log("sign : ",registered)

    setRunning(false)
    
    if(registered){
      navigate("/")
    }
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    // console.log("onSubmit : ",event)
  }

  const RandomFields = ()=>{
    setName(RandomName())
    setSurname(RandomName())

    setLogin(RandomLogin())
    setEmail(RandomEmail())

    setPassword(RandomPassword())
  }

  const changeName = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setName(event.target.value)
  }

  const changeSurname = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setSurname(event.target.value)
  }

  const changeLogin = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setLogin(event.target.value)
  }

  const changeEmail = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setEmail(event.target.value)
  }

  const changePassword = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(event.target.value)
  }


  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.projectName}>Fire party</span>
      </header>
      <div className={styles.registerform}>
        <form onSubmit={onSubmit} method="POST" action="/">
          <h1>Sign Up</h1>

          <label htmlFor="name">Name</label>
          <input
            name="name"
            value={name}
            onChange={changeName}
          />

          <label htmlFor="surname">Surname</label>
          <input
            name="surname"
            value={surname}
            onChange={changeSurname}
          />

          <label htmlFor="login">Login</label>
          <input
            name="login"
            value={login}
            onChange={changeLogin}
          />


          <label htmlFor="email">Email address</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={changeEmail}
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            autoComplete="off"
            value={password}
            onChange={changePassword}
          />
          
          <button
            className={styles.btn_randomFields}
            onClick={RandomFields}
          >Random fields</button>

          <button
            className={styles.btn_submit} 
            type="submit"
            disabled={running}
            onClick={onSignUp}
          >Sign up</button>

        </form>

        <div className={styles.venderDiv}>
          <span className={styles.venderLabel}>Sign in using other services</span>
        </div>

        <div className={styles.venderSignin}>

          <button className={styles.vender_btnGoogle}>
            <img 
              className={styles.vender_imgGoogle}
              src="./icon/google.png" 
              alt="google"
            />
            <span>Google</span>
          </button>

        </div>

      </div>
    </div>
  )
}
