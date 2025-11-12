import * as echarts from 'echarts';
import {useEffect, useRef} from 'react';
import {axisOption,normalOption} from '../assets/datas/data';

//echarts的配置数据

const  Echarts = ({style,chartData,isAxisChart=true}:any)=>{
    //获取dom实例
    const echartRef = useRef<HTMLDivElement|null>(null);
    //创建响应式事件 但不会影响渲染
    let echartsObj=useRef<echarts.EChartsType|null>(null);
    //在当前页面挂载完成之后
    useEffect(()=>{
        let options;
        //echarts的初始化
        echartsObj.current=echarts.init(echartRef.current);
        //设置option
        //有坐标系
        if(isAxisChart){
            axisOption.xAxis.data = chartData.xData;
            axisOption.series = chartData.series;
            options=axisOption
        }else{
            //没坐标系
            normalOption.series=chartData.series;
            options=normalOption
        }
        echartsObj.current.setOption(options);
    },[chartData])//当 chartData数据发生改变时 也进行这段逻辑
    return(
        //绑定ref来实现动态获取dom元素
        <div style={style} ref={echartRef}>

        </div>
    )
}
export default Echarts;