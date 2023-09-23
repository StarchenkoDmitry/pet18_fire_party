import api from "@/api/api";
import styles from "./page.module.scss"
import MainScreen from "@/components/screens/MainScreen";



export default async function Main() {  
  console.log("Main page")

  const res =  await api.get("page/main")
  console.log("API: ",res.data)

  return (<MainScreen/>);
}

