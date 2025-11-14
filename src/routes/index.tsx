import { createBrowserRouter,Navigate } from "react-router";
import Main from "../pages/main";
import Home from "../pages/home";
import Mall from "../pages/mall";
import Users from "../pages/users";
import Page1 from "../pages/other/page1";
import Page2 from "../pages/other/page2";
import Login from "../pages/login";

const routers=[
    {
        path:"/", //访问‘/’,进行重定向
        Component:Main,  //一般用于表头一直都存在的组件
        children:[
            //重定向 ，当访问'/'时，重定向到'/home'
            {
                path:'/',
                element:<Navigate to='/home' />
            },
            {
                path:'home',
                Component:Home
            },
            {
                path:'mall',
                Component:Mall
            },
            {
                path:'users',
                Component:Users
            },{
                path:'other',
                children:[
                    {
                        path:'page1',
                        Component:Page1
                    },
                    {
                        path:'page2',
                        Component:Page2
                    }
                ]
            }
        ]
    },{
        path:"/login",
        Component:Login
    }
]
//将路由对外暴露 这样可以通过对象来使用路由
export default createBrowserRouter(routers);