import React from "react";
import { menuConfig } from "../config";
import * as Icon from '@ant-design/icons';
import { useNavigate } from "react-router";
import {Layout, Menu } from 'antd';
const { Sider} = Layout;

//动态获取Icon
const iconToElement =(name:string)=> React.createElement((Icon as any)[name]);

//处理菜单列表的函数
const items = menuConfig.map((item:any) => {
    //没有子菜单
    const child: any = {
        key: item.path,
        icon: iconToElement(item.icon),
        label: item.label,
    }
    //有子菜单
    if(item.children){
        child.children = item.children.map((childItem:any) => {
            return {
                key: childItem.path,
                icon: iconToElement(childItem.icon),
                label: childItem.label,
            }
        })
    }
    return child;
})


//定义接受的函数参数
interface CommonAsideProps {
    iscollapsed: boolean;
}

const CommonAside= ({ iscollapsed }:CommonAsideProps) => {
    const navigate=useNavigate();
    //菜单跳转函数
    const selectMenu=(e:{key:string})=>{
        navigate(e.key);
    }
    return (
        <>
            {/* 侧边栏区域 */}
            <Sider 
            trigger={null} 
            collapsible 
            collapsed={iscollapsed}
            className="shadow-lg h-screen overflow-auto"
            >
            <div className="text-white text-xl font-bold h-16 m-4 flex items-center justify-center bg-gray-800/50">
                <h3>{iscollapsed ? '后台' : '通用后台管理系统'}</h3>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                className="border-r-0"
                items={items}
                onClick={selectMenu}
            />
            </Sider>
        </>
    );
}
export default CommonAside;