import CryptoJS from "crypto-js";
const SECRET_KEY = "mysecretkey";


export default function encrypass(password){

   const encry= CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
   return encry
}