# React 学习笔记

## axios的二次封装

### 概述

axios 二次封装的主要目的是：

- 统一管理请求配置（baseURL、timeout、headers等）
- 统一处理请求拦截器和响应拦截器
- 便于全局错误处理和请求日志记录
- 提高代码复用性和可维护性

### 实现步骤

首先我们创建一个 `src/api` 文件夹，在该文件夹下创建 `axios.ts` 文件对axios进行二次封装。

### 核心代码

```ts
//对axios进行二次封装 准确来说就是创建实例
import axios from "axios";

const baseUrl ='/api';

//axios二次封装的核心逻辑
//使用ES6的class类来创建 面向对象的形式来创建
class HttpRequest{
    baseUrl: string;
    constructor(baseUrl:string){
        this.baseUrl = baseUrl;
    }
    
    getInsideConfig(){
        const config = {
            baseURL:this.baseUrl,
            timeout:5000,
            headers:{
                'Content-Type':'application/json'
            }
        }
        return config;
    }
    
    //创建拦截器
    interceptors(instance:any){
        // 添加请求拦截器
        instance.interceptors.request.use(function (config: any) {
            // 在发送请求之前做些什么
            return config;
        }, function (error: any) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response: any) {
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            return response;
        }, function (error: any) {
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
        });

    }


    /**
     * 发起HTTP请求
     * @param options 请求配置选项
     * @returns Promise 返回axios请求的Promise对象
     */
    request(options:any){
        // 合并默认配置和传入的配置，传入的配置优先级更高
        options={...this.getInsideConfig(),...options};
        // 创建axios实例
        const instance = axios.create();
        // 绑定请求和响应拦截器到实例
        this.interceptors(instance);
        // 发起请求并返回Promise
        return instance(options);
    }
}
export default new HttpRequest(baseUrl);
```

### 代码结构解析

#### 1. HttpRequest 类

- `baseUrl`：基础 URL 属性，用于存储 API 的根路径
- `constructor`：构造函数，初始化 baseUrl

#### 2. getInsideConfig 方法

- 返回 axios 的默认配置对象
- 包含：baseURL、timeout（超时时间5秒）、headers（请求头）

#### 3. interceptors 方法

- 配置请求拦截器：在请求发送前执行，可添加 token、修改请求参数等
- 配置响应拦截器：在响应返回后执行，可统一处理响应数据、错误处理等

#### 4. request 方法

- 核心请求方法
- 合并默认配置和传入配置（传入配置优先级更高）
- 创建 axios 实例并绑定拦截器
- 返回 Promise 对象

### 关键技术点

#### ES6 Class 类的使用

```typescript
class HttpRequest {
    baseUrl: string;  // TypeScript 类属性声明
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;  // 实例化时初始化
    }
}
```

#### 对象展开运算符合并配置

```typescript
options = {...this.getInsideConfig(), ...options};
// 后面的 options 会覆盖前面的同名属性
```

#### 单例模式导出

```typescript
export default new HttpRequest(baseUrl);
// 导出实例而非类，确保全局只有一个实例
```

### 使用示例

在 `src/api/index.ts` 中定义具体的 API 接口：

```typescript
import http from "./axios";

export const getUserList = () => {
    return http.request({
        url: "/api/user/list",
        method: "GET"
    })
}

export const createUser = (data: any) => {
    return http.request({
        url: "/api/user/create",
        method: "POST",
        data
    })
}
```

在组件中使用：

```typescript
import { getUserList } from "@/api";

const fetchData = async () => {
    try {
        const response = await getUserList();
        console.log(response.data);
    } catch (error) {
        console.error("请求失败:", error);
    }
}
```

### 优化建议

1. **添加类型定义**：为 request 方法添加完整的 TypeScript 类型
2. **拦截器增强**：在请求拦截器中添加 token、在响应拦截器中统一处理错误码
3. **取消重复请求**：添加请求取消逻辑，避免重复请求
4. **Loading 状态管理**：集成全局 loading 状态
5. **错误重试机制**：失败时自动重试指定次数
