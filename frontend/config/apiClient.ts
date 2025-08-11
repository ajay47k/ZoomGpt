import axios from "axios";
import queryClient from "./QueryClient";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

const options = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, // Ensure cookies are sent with requests

};

const API = axios.create(options);

const TokenRefreshToken = axios.create(options)
TokenRefreshToken.interceptors.request.use((response)=>response.data)
API.interceptors.response.use(
    (response)=>response.data,
    async (error) =>{
    const {config,response} = error;
        const router = useRouter()

    // console.error("❌ Response Error:", {
    //   message: error.message,
    //   status: error.response?.status,
    //   statusText: error.response?.statusText,
    //   url: error.config?.url,
    //   data: error.response?.data,
    //   headers: error.response?.headers,
    // })
        // console.error("Here",error)    
        const {status,data}=error.response 
        // console.log("Here Again",status,data)
        // try to refresh status tokens behind the scenes
        if (status === 401 && data?.errorCode=="InvalidAccessToken")
        {
            try{
                await API.post("/auth/refresh-token")
                return TokenRefreshToken(config)
            }
            catch(error){
                queryClient.clear()
                router.replace("/login")
            }
        }

        return Promise.reject({status,...data})
    }
)



export default API;