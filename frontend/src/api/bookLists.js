import axios from 'axios'

export const getBookLists =  async () => {
    try {
        const { data } = await axios.get(
            "https://www.googleapis.com/books/v1/volumes?q=search+terms"
        );
        // console.log(data.results);
        return (data)
    } catch (error) {
        console.log(error);
    }
};
