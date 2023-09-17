'use client'
import { useState } from "react";
import styles from "./page.module.scss"

export default function AuthPage() {
  const [login,setLogin] = useState("");
  const [password,setPassword] = useState("");
  const [sending,setSending] = useState(false);




  const funcSend = ()=>{

    setSending(true);
  }

  return (
    <div className={styles.container+" flex flex-col items-center justify-center"}>
      <div className="flex flex-col p-4 bg-slate-400 rounded-2xl">
        <span>Авторизация</span>
        <form className="flex flex-col" action="/auuu" method="post">
          <label htmlFor="login">Логин.</label>
          <input name="login" id="login" type="text"/>

          <label htmlFor="password">Пароль</label>
          <input name="password" id="password" type="password"/>

          <button disabled={sending} onClick={funcSend} type="submit" className="">Войти</button>
          <button type="submit">Войти(Submit)</button>
        </form>
      </div>
    </div>
  );
}
