import { createSlice } from '@reduxjs/toolkit';

// 创建 tab 状态切片，用于管理侧边栏和标签页相关状态
const tabSlice = createSlice({
    name: 'tab',
    // 初始状态
    initialState: {
        isCollapse: false, // 侧边栏是否折叠
        tabList:[
            {
                path:'/',
                name:'home',
                label:'首页', //代表Tag的名字
            }
        ]
    },
    // 定义 reducers
    reducers: {
        // 切换侧边栏折叠状态
        collapseMenu: (state) => {
            state.isCollapse = !state.isCollapse;
        },
        selectMenuList:(state,{payload:val})=>{
            //首页是不需要设置的
            if(val.name!=='name'){
                //如果已经存在的话就不需要添加了 所以这里要进行一个判断
                const reductIndex=state.tabList.findIndex(item=>{item.name==val.name});
                //只有不存在的时候才会添加
                if (reductIndex===-1){
                    state.tabList.push(val);
                }
            }
        }
    }
});

// 导出 action creators
export const { collapseMenu,selectMenuList } = tabSlice.actions;
// 导出 reducer
export default tabSlice.reducer;