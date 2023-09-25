import MainScreen from "@/components/screens/MainScreen";
import styles from "./Me.module.scss"


export default function Home() {
  return (
    <div className={styles.page}>
      <MainScreen/>
    </div>
  );
}







// async function test2():Promise<number>{
//   try {
    
//   throw "error";
//     return 20;
//   } catch (error) {
    
//     return 50;
//   }
//   finally{
     
//     // return 10;
//   }
  
// }

// test2().then(r=>{
//   console.log("r: ",r);
// }).catch((error)=>{
//   console.log("catch");
// }).finally(()=>{
//   console.log("finally");
// });