
import axios from "axios";
import { axiosInstance } from "../config.service";

// export const getPosts = async () => {
//     return axiosInstance.get(`/`);
// }

export const postPost = async (data) => {
    return axiosInstance.post(`/api/v1/media`, data);
}

export const getAllPosts =  (page,pageSize) => {
    return   axios.get(`https://minly-social-network-backend.onrender.com/api/v1/media`);
}