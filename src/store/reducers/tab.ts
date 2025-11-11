import { createSlice } from '@reduxjs/toolkit';

// 创建 tab 状态切片，用于管理侧边栏和标签页相关状态
const tabSlice = createSlice({
    name: 'tab',
    // 初始状态
    initialState: {
        isCollapse: false // 侧边栏是否折叠
    },
    // 定义 reducers
    reducers: {
        // 切换侧边栏折叠状态
        collapseMenu: (state) => {
            console.log('2222')
            state.isCollapse = !state.isCollapse;
        },
    }
});

// 导出 action creators
export const { collapseMenu } = tabSlice.actions;
// 导出 reducer
export default tabSlice.reducer;