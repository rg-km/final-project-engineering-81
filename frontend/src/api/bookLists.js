import axios from 'axios'
const BASE_URL = "https://www.googleapis.com/books/v1/volumes"

export const getBookLists =  async () => {
    try {
        const { data } = await axios.get(
            `${BASE_URL}?q=search+terms`
        );
        // console.log(data.results);
        return (data)
    } catch (error) {
        return (console.log(error))
    }
};


export const getBooksDetail = async(id) =>{
    try {
        const detail= await axios.get(
            `${BASE_URL}/${id}`
        )
        return detail
    } catch (error) {
        console.log(error);
    }
}


// export const testgetBookLists = async () => {
//     try {
//         const lists = await axios.get("http://localhost:8080/api/books")
//         return lists
//     } catch (error) {
//         console.log(error);
//     }
// }