import http from "./axios";

export const getUserList = () => {
    return http.request({
        url: "/home/userlist",
        method: "GET"
    })
}

export const getUserData = (params:any) => {
    return http.request({
        url: "/user/getUser",
        method: "GET",
        params
    })
}