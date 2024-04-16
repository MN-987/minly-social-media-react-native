import axios from "axios";
 

 export const TestAxios = async()=>{
        return  await axios.get("https://minly-social-network-backend.onrender.com/api/v1/media")
 }