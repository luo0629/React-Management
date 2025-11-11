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

export const addUserData = (data:any) => {
    return http.request({
        url: "/user/addUser",
        method: "POST",
        data   //post接口底层axios封装 使用data传递数据
    })
}

export const editUserData = (data:any) => {
    return http.request({
        url: "/user/editUser",
        method: "POST",
        data   //post接口底层axios封装 使用data传递数据
    })
}
