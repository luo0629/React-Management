import React from "react";
import { Form, Input, Button, message} from "antd";
import Backgroundimage from "../assets/背景.png";
import { getMenu } from "../api";
import { useNavigate,Navigate } from "react-router";

//如果登录状态下再进入到login时需要进行重定向进入系统 使用Navigate

const Login: React.FC = () => {
    const navigate =useNavigate();

    //用户鉴权
    //登录情况下需要调用登陆的后端接口 然后后端接口返回一个token缓存在浏览器中 再进入页面时我们需要判断token是否存在 如果存在则进入系统 否则跳转login页面
    //登录状态下直接进入系统 跳转到home页面
    if (localStorage.getItem('token')){
        return <Navigate to='/home'/>
    }

    //登录表单的回调函数
    const handleSumbit =(val:any)=>{
        if(!val.password || !val.username){
            return message.open({
                type:'warning',
                content:'请输入用户名和密码'
            })
        }
        getMenu(val).then(({data})=>{
            console.log(data,'1111222');
            //将传回来的token数据储存到浏览器中
            localStorage.setItem('token',data.data.token);
            navigate('/home')
        })
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
                fontFamily: "Inter, sans-serif",
                backgroundImage: `url(${Backgroundimage})`
            }}
        >
            {/* 毛玻璃容器 */}
            <div className="w-full max-w-md bg-white/30 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-10
    transform transition-all duration-300 hover:backdrop-blur-3xl hover:bg-white/40 hover:shadow-[0_8px_40px_0_rgba(31,38,135,0.45)]">

                <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900 drop-shadow-sm tracking-wide">
                    Login
                </h2>

                <Form  className="space-y-6" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={handleSumbit}>
                    <Form.Item
                        label="Username"
                        name="username"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            placeholder="请输入用户名..."
                            className="h-12 rounded-xl border-gray-300 bg-white/50 backdrop-blur-sm
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-300
                   transition-all shadow-inner"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        // rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password 
                            placeholder="请输入密码..."
                            className="h-12 rounded-xl border-gray-300 bg-white/50 backdrop-blur-sm
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-300
                   transition-all shadow-inner"
                        />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="!h-12 !rounded-xl w-full 
                                    !bg-white/30 !border !border-white/40 
                                    backdrop-blur-md
                                    text-gray-800 font-medium
                                    hover:!bg-white/40 hover:shadow-lg
                                    transition-all"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
