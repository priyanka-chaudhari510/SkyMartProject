import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:"https://fakestoreapi.com",
})

axiosInstance.interceptors.response.use((response)=>{
    console.log("in interpector",response);
    return response;
},
(error)=>{
    console.log(error);
    
}
)