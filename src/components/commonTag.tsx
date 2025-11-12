import {Space, Tag} from "antd";
//获取store中的数据 就需要使用useSelector
import { useSelector,useDispatch } from "react-redux";
import { closeTag,setCurrentTag } from "../store/reducers/tab";
//获得当前路由的信息 是由Router中的useLocation的钩子函数
import { useLocation,useNavigate } from "react-router";



interface TabListType{
    path:string,
    name?:string,
    label:string
}

const CommonTag=()=>{
    //使用store来储存状态信息，并使用useSelector来获取状态信息
    //获取store里面的状态信息
    const tabList=useSelector((state:any)=>state.tab.tabList);
    //获取当前选中的数据
    const currentMenu=useSelector((state:any)=>state.tab.currentMenu);
    const dispatch=useDispatch();
    const action=useLocation();
    const navigate=useNavigate();

    console.log(tabList);

    const handleClose=(item:TabListType,index:number)=>{
        let length=tabList.length-1;
        dispatch(closeTag(item));
        //如果关闭不是当前的tag
        if(item.path !== action.pathname){
            return
        }
        //如果关闭是当前的tag
        if(index===length){
            //最后一个tag关闭时 要向前移动
            //设置当前数据
            const currentData=tabList[index-1];
            dispatch(setCurrentTag(currentData));
            //实现路由跳转
            navigate(currentData.path);
        }else{
            //不是最后一个tag关闭时 要向后移动
            //如果tag至少存在一个数据，则选中后一个tag
            if (tabList.length>1){
                const nextData=tabList[index-1];
                dispatch(setCurrentTag(nextData));
                //实现路由跳转
                navigate(nextData.path);
            }

        }

    }
    //点击tag事件
    const handelChange=(tag:TabListType)=>{
        dispatch(setCurrentTag(tag));
        navigate(tag.path);

    }
    //多级html渲染 建议拆分成多个函数进行
    const setTag=(falg:boolean,item:TabListType,index:number)=>{
        return (
            falg?<Tag key={item.name} color="#55acee" closeIcon onClose={()=>handleClose(item,index)}>{item.label}</Tag>
            :<Tag onClick={()=>handelChange(item)} key={item.name}>{item.label}</Tag>
        )

    }


    //Tag的选中颜色可以根据路由来聚焦变化 只有当前路由对应的Tag显示颜色 其余的Tag都显示默认颜色即可
    return(
        <Space size={[0,8]} wrap className="pt-[24px] pl-[20px]">
            {/* <Tag>首页</Tag>
            <Tag color="#55acee" closeIcon onClose={()=>handleClose()}>
                用户列表
            </Tag> */}
            {
                currentMenu.name&&tabList.map((item:TabListType,index:number)=>(setTag(item.path===currentMenu.path,item,index)))
            }
        </Space>
    );

};

export default CommonTag;