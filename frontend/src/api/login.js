
export const getLogin = async()=>{
    try {
        const getLogin = await axios.post(
            "http://localhost:8080/api/user/login",
            {
                email : "ruben@gmail.com",
                password : "ruben123"
            },
            {
              headers: {
                "Access-Control-Allow-Origin" : "*",
              },
              withCredentials: true,
            }
          )
        console.log("getLogin");
        return (getLogin)
    } catch (error) {
        console.log(error);
    }
}