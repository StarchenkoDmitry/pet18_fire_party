'use client'
import { FormEvent, useState } from "react";
import styles from "./page.module.scss"
import axios from "axios";
import Header from "@/components/header/Header";



const url = "http://localhost:3000/auth/loginform";

export default function AuthPage() {
  const [login,setLogin] = useState("");
  const [password,setPassword] = useState("");
  const [sending,setSending] = useState(false);


  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)

    const formData = new FormData(event.currentTarget);
    try {
      const res = await axios.post(url,formData,{
        withCredentials:true
      });
 
      const data = res.data;

    } catch (error) {
      console.error(error)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className={styles.container+" flex flex-col items-center justify-center"}>
      
      <Header/>
      <div className="flex flex-col p-4 bg-slate-400 rounded-2xl">
        <span>Авторизация</span>

        <form onSubmit={onSubmit} className="flex flex-col" method="post">

          <label htmlFor="email">Email</label>
          <input name="email" id="email"  type="email"/>

          <label htmlFor="password">Пароль</label>
          <input name="password" id="password" type="password"/>

          {/* <button disabled={sending} type="submit" className="">Войти</button> */}
          <button type="submit">Войти(Submit)</button>
        </form>
      </div>
    </div>
  );
}







// async function onSubmit(event: FormEvent<HTMLFormElement>) {
//   event.preventDefault()
//   setSending(true)

//   try {
//     const formData = new FormData(event.currentTarget)
//     formData.append("dsdfds","dgfdgfdg");

//     const data34643 = {
//       login:"sdfdsfdsf",
//       password:"dgfdsf4534346346"
//     }

//     const response = await fetch(url, {
//       method: 'POST',
//       body:formData,
//       headers:{
        
//       }
//       credentials:"same-origin"
//       headers:{
//         'Access-Control-Allow-Origin': "*",
//         'content-type': 'application/json',
//         'Access-Control-Allow-Credentials': 'true',
//     }
//     })

//     const data = await response.json()
//   } catch (error) {
//     console.error(error)
//   } finally {
//     setSending(false)
//   }
// }





























// 'use client'
// import { FormEvent, useState } from "react";
// import styles from "./page.module.scss"
// import axios from "axios";



// const url = "http://localhost:3000/auth";

// export default function AuthPage() {
//   const [login,setLogin] = useState("");
//   const [password,setPassword] = useState("");
//   const [sending,setSending] = useState(false);



//   async function onSubmit(event: FormEvent<HTMLFormElement>) {
//     // event.preventDefault()
//     setSending(true)
 
//     try {
//       const res = await axios.post(url,{
//         login:""
//       },{
//         withCredentials:true
//       });
 
//       const data = res.data;
//     } catch (error) {
//       console.error(error)
//     } finally {
//       setSending(false)
//     }
//   }

//   return (
//     <div className={styles.container+" flex flex-col items-center justify-center"}>
//       <div className="flex flex-col p-4 bg-slate-400 rounded-2xl">
//         <span>Авторизация</span>
//         {/* <form className="flex flex-col" onSubmit={onSubmit}>
//           <label htmlFor="email">Email</label>
//           <input name="email" id="email" type="email"/>

//           <label htmlFor="password">Пароль</label>
//           <input name="password" id="password" type="password"/>

//           <button disabled={sending} type="submit" className="">Войти</button>
//           <button type="submit">Войти(Submit)</button>
//         </form> */}

//         <form action={url} className="flex flex-col" method="post">

//           <label htmlFor="email">Email</label>
//           <input name="email" id="email"  type="email"/>

//           <label htmlFor="password">Пароль</label>
//           <input name="password" id="password" type="password"/>

//           <button disabled={sending} type="submit" className="">Войти</button>
//           <button type="submit">Войти(Submit)</button>
//         </form>
//       </div>
//     </div>
//   );
// }







// async function onSubmit(event: FormEvent<HTMLFormElement>) {
//   event.preventDefault()
//   setSending(true)

//   try {
//     const formData = new FormData(event.currentTarget)
//     formData.append("dsdfds","dgfdgfdg");

//     const data34643 = {
//       login:"sdfdsfdsf",
//       password:"dgfdsf4534346346"
//     }

//     const response = await fetch(url, {
//       method: 'POST',
//       body:formData,
//       headers:{
        
//       }
//       credentials:"same-origin"
//       headers:{
//         'Access-Control-Allow-Origin': "*",
//         'content-type': 'application/json',
//         'Access-Control-Allow-Credentials': 'true',
//     }
//     })

//     const data = await response.json()
//   } catch (error) {
//     console.error(error)
//   } finally {
//     setSending(false)
//   }
// }