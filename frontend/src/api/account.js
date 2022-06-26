import axios from "axios";
import useAccountStore from "../store/accountStore";

export const getLogin = async(formLogin)=>{
    try {
        const getLoginApi = await axios.post(
            "http://localhost:8080/api/user/login",
            formLogin,
            {credentials: 'include',
            // withCredentials:true
        }
            // {
            //     withCredentials:true
            // }
        )
        
        return getLoginApi
    } 
    catch (error) {
        console.log(error);
        // return (error)
    }
}


export const logout = async()=>{
    try {
        const logedOut = await axios.post(
            "http://localhost:8080/api/user/logout",
            // account
        )
        return logedOut
    } catch (error) {
        console.log(error);
    }
}
