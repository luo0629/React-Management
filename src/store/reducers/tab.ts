import { createSlice, current } from '@reduxjs/toolkit';

// 创建 tab 状态切片，用于管理侧边栏和标签页相关状态
const tabSlice = createSlice({
    name: 'tab',
    // 初始状态
    initialState: {
        isCollapse: false, // 侧边栏是否折叠
        //点击菜单项的数据记录
        tabList:[
            {
                path:'/',
                name:'home',
                label:'首页', //代表Tag的名字
            }
        ],
        //选中数据的存储
        currentMenu:{}
    },
    // 定义 reducers
    reducers: {
        // 切换侧边栏折叠状态
        collapseMenu: (state) => {
            state.isCollapse = !state.isCollapse;
        },
        selectMenuList:(state,{payload:val})=>{
            //首页是不需要设置的 不是首页时
            if(val.name!=='home'){
                state.currentMenu=val
                //如果已经存在的话就不需要添加了 所以这里要进行一个判断
                const reductIndex=state.tabList.findIndex(item=> item.name === val.name);

                console.log(val,'val');
                console.log(reductIndex,'reductIndex');
                //只有不存在的时候才会添加
                if (reductIndex === -1){
                    state.tabList.push(val);
                }
                //如果当前是首页并且tabList内容中只有一个
            }else if (val.name==='home' &&state.tabList.length===1){
                //是首页时
                state.currentMenu={}
            }
        },
        closeTag:(state,{payload:val})=>{
            let res=state.tabList.findIndex(item=>item.name===val.name);
            state.tabList.splice(res,1);
        },
        //设置当前选中的tag数据
        setCurrentTag:(state,{payload:val})=>{
            if(val.name==='home'){
                state.currentMenu={}
            }else{
                state.currentMenu=val
            }
        }

    }
});

// 导出 action creators
export const { collapseMenu,selectMenuList,closeTag,setCurrentTag } = tabSlice.actions;
// 导出 reducer
export default tabSlice.reducer;