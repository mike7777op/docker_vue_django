import axios from "axios";
import router from "@/router";


export const accountService = {
    clean_login_info,
    login,
}

function clean_login_info(){
    var user_lang=localStorage.getItem("user_lang");
    user_lang=user_lang?user_lang:"zh_tw";
    localStorage.clear();
    localStorage.setItem("user_lang", user_lang);
    console.log("?")
    router.push("/login");
}

function login(param){
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_API}/v1/account/login`, param).then((resp) => {
            resolve(resp.data)}).catch((error) => {
                reject(error)
            }
        )
    })
}