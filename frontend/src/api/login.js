import axios from "axios";

export const getLogin = async(formLogin)=>{
    try {
        const getLoginApi = await axios.post(
            "http://localhost:8080/api/user/login",
            formLogin
          )
        return getLoginApi
    } catch (error) {
        console.log(error);
    }
}