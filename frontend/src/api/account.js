import axios from "axios";

const BASE_URL = "http://localhost:8080/api/user"

export const getLogin = async(formLogin)=>{
    try {
        const getLoginApi = await axios.post(
            `${BASE_URL}/login`,
            formLogin,
        //     {credentials: 'include',
        //     // withCredentials:true
        // }
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


export const logout = async(cookies)=>{
    try {
        const logedOut = await axios.post(
            `${BASE_URL}/logout`,
            cookies,
            {
                        headers: {Cookie : `token=${cookies.token}`}
                    }
            //    { withCredential:true},
            
        )
        return logedOut
    } catch (error) {
        console.log(error);
    }
}


export const register = async(dataRegister)=>{
    try {
        const register = await axios.post(
            `${BASE_URL}/register`,
            dataRegister
            )
        return register
    } catch (error) {
        console.log(error);
    }
}