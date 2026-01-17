import axios from "axios";


const baseURL = process.env.NEXT_PUBLIC_SITE_URL + '/api'

const createAxiosInstance = () => {
    return axios.create({
        baseURL,
        withCredentials: false,
    });
};

export const axiosInstance = createAxiosInstance();