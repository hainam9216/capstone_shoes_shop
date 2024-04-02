import axios from "axios";
import { history } from "..";
import { jwtDecode } from "jwt-decode";

export const TOKEN = 'accesstoken'
export const DOMAIN_BACKEND = 'https://shop.cyberlearn.vn'
export const http = axios.create({
    baseURL: DOMAIN_BACKEND, //domain
    timeout: 30000 // thời gian chờ tối đa
})
// Cấu hình request
http.interceptors.request.use((config) => {
    // Tất cả các request gửi đi sẽ được chứa trong phần header là token đăng nhập
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`
    }
    return config
}, err => {
    return Promise.reject(err)
})
// Cấu hình response
http.interceptors.response.use((res) => {
    // thành công
    return res
}, err => {
    // xử lí thất bại
    // window.location.href = '/'
    console.log('util', err.response);
    const statusCode = err.response.status
    if (statusCode === 400) {
        history.push('/')
    } else if (statusCode === 401) {
        //Kiểm tra toke hết hạn hay chưa
        // Nếu hết hạn thì gọi api refeshtoken
        const decodeToken = jwtDecode(localStorage.getItem(TOKEN))

        const date = new Date(decodeToken.exp * 1000)
        console.log(date);
        if (date < Date.now()) {
            //Gọi api refresh
            console.log('gọi api refresh token');
        }

        // không có token chuyển hướng trang api login bắng đăng nhập
        alert('Đăng nhập để vào trang này')
        history.push('/login')
    } else if (statusCode === 403) {
        alert('Không đủ quyền truy cập')
        history.push('/')
    } else if (statusCode === 500) {
        console.log(err.response.message);
    }

    return Promise.reject(err)
})
