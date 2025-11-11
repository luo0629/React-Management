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