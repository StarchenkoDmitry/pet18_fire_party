// 'use client'
import { IsExistSession } from "@/components/actions/ServerActions";
import styles from "./page.module.scss"
import MainScreen from "@/components/screens/MainScreen";

import { cookies } from 'next/headers'
import { useParams } from 'next/navigation'


export default function Page({ params }:any) {
  console.log("Params: ",params)
  // const params = useParams();

  // const cookieStore = cookies()
  // cookieStore.getAll().map((cookie)=>{
  //   console.log(`[${cookie.name}]: ${cookie.value}`)
  // });

  
  return (<MainScreen/>);
}

