import axios from "axios";


const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL, //qa
    headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("ss_token"))}`,
    }
});


authAxios.interceptors.response.use((config) => {
    return config;
}, (error) => {
    let { response: { data: { status } } } = error
    if (status == 401) {
        localStorage.clear()
    }
    return Promise.reject(error);
});





export default authAxios;