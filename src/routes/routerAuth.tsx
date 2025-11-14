//路由守卫 对权限进行一个判断 从而在没有token时 不能访问到系统内部的任何一个页面
import { Navigate } from "react-router";

const routeAuth =({children}:{children:any})=>{
    const token=localStorage.getItem('token');
    if(!token){
        /*
        replace表示 替换当前历史记录，而不是在浏览器历史记录中新增加一条。
        好处：用户点击浏览器的“返回”按钮时，不会回到被重定向的页面。
        */
        return <Navigate to='/login' replace/>
    }
    return (
        children
    )

}
export default routeAuth;