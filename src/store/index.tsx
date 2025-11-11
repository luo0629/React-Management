import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './reducers/tab';

// 配置并创建 Redux store
const store = configureStore({
    reducer: {
        tab: tabReducer, // 注册 tab reducer
    }
});

// 导出 store 实例
export default store;