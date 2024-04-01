import axios from "axios";

export const DOMAIN_BACKEND = 'https://shop.cyberlearn.vn'
export const http = axios.create({
    baseURL: DOMAIN_BACKEND, //domain
    timeout: 30000 // thời gian chờ tối đa
})
