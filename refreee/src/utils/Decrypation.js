import CryptoJS from "crypto-js";
const SECRET_KEY = "mysecretkey";


export default function decrydata(password) {
    const decryPass = CryptoJS.AES.decrypt(password,SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decryPass;
    }