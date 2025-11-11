import React from "react";
import {Layout,theme } from 'antd';
const { Content } = Layout;
import CommonAside from "../components/commonAside";
import CommonHeader from "../components/commonHeader";
// Outlet 是 React Router 中的一个组件，用于渲染子路由的组件
import { Outlet } from "react-router"; 
import { useSelector } from "react-redux";


const Main:React.FC = () => {
    //由于Header中的按钮需要控制菜单栏的折叠和按钮样式变化，所以需要在这两个组件共同的跟组件中进行状态设置，并将状态作为参数传到这两个组件中
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    //使用store来储存状态信息，并使用useSelector来获取状态信息
    //获取store里面的状态信息
    const isCollapse = useSelector((state:any) => state.tab.isCollapse);

    return (
      <Layout className="h-screen">
        {/* 侧边栏区域 */}
        <CommonAside iscollapsed={isCollapse}/>

        <Layout className="flex flex-col h-screen">

          {/* 头部区域 */}
          <CommonHeader iscollapsed={isCollapse}/>

          {/* 内容区域 */}
          <Content className="m-6 p-6 flex-1 bg-white rounded-lg shadow-md overflow-auto">
            <Outlet />
          </Content>
          
        </Layout>
      </Layout>
    );
}
export default Main;

