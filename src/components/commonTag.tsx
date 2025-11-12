import React from "react";
import {Space, Tag} from "antd";
//获取store中的数据 就需要使用useSelector
import { useSelector } from "react-redux";

const CommonTag=()=>{
    //使用store来储存状态信息，并使用useSelector来获取状态信息
    //获取store里面的状态信息
    const tabList=useSelector((state:any)=>state.tab.tabList);
    console.log(tabList);
    const handleClose=()=>{

    }

    //Tag的选中颜色可以根据路由来聚焦变化 只有当前路由对应的Tag显示颜色 其余的Tag都显示默认颜色即可
    return(
        <Space size={[0,8]} wrap className="pt-[24px] pl-[20px]">
            <Tag>首页</Tag>
            <Tag color="#55acee" closeIcon onClose={()=>handleClose()}>
                用户列表
            </Tag>
        </Space>
    );

};

export default CommonTag;