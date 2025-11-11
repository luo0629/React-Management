import React,{useEffect,useState} from "react";
import {Row,Col,Card,Table} from "antd";
import logo from '../assets/user.jpg';
import {getUserList} from "../api";
import * as Icon from '@ant-design/icons';
import {columns, countData} from '../assets/datas/data';
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import MyEcharts from '../components/Echarts';

interface EchartsDataType {
    order:{
        xData: string[];
        series: {
            name: string;
            type: string;
            data: any[];
        }[];
    },
    user:{
        xData:string[];
        series:{
            name:string;
            data:string;
            type:string;
        }[]
    }
    video:{
        series:{
            data:any[];
            type:string;
        }[]
    }

}

//动态获取Icon
const iconToElement =(name:string)=> React.createElement((Icon as any)[name]);
//页面加载之后调用接口
const Home:React.FC = () => {
    //定义table数据
    const [tableData,setTableData]=useState([]);
    //创建echarts相应数据  组件间的数据传递 需要响应式的数据
    const [echartsData, setEchartsData] = useState<EchartsDataType>({
        order:{
            xData: [],
            series: []
        },
        user:{
            xData: [],
            series: []
        },
        video:{
            series:[]
        }

    });

    //副作用的函数都是在useEffect中执行    dom首次渲染完成之后调用
    useEffect(()=>{
        //调用api中的getUserList() 方法 then(data)中获得调用接口返回的数据data
        getUserList().then(({data})=>{
            console.log(data);
            const {tableData,orderData,userData,videoData}=data.data;
            setTableData(tableData);
            //echarts 数据的组装

            //series数据组装
            // 获取对象的 key（品牌名）
            const keyArray = Object.keys(orderData.data[0]);

            // 组装 series 数据
            const series = keyArray.map((key) => ({
                name: key,
                type: 'line',
                data: orderData.data.map((item: any) => item[key])
            }));

            setEchartsData({
                order:{
                    //x轴的数据
                    xData:orderData.date,
                    series
                },
                user:{
                    xData:userData.map((item:any)=>item['date']),
                    series:[
                        {
                            name:'新增用户',
                            data:userData.map((item:any)=>item.new),
                            type:'bar'
                        },
                        {
                            name:'活跃用户',
                            data:userData.map((item:any)=>item.active),
                            type:'bar'
                        }
                    ]
                },
                video:{
                    series:[
                        {
                            data:videoData,
                            type:'pie',
                        }
                    ]
                }
            })

        })},[])//第二个[]表示依赖的数据，空数组表示页面加载时只会触发一次，如果里面有state相关的数据 就会根据state的变化进行变化

    return (
        <Row className="h-full">
            <Col span={8}>
                <Card hoverable>
                    <div className="user flex items-center border-b-2 border-gray-300 pb-4">
                        <img src={logo} className="w-[120px] h-[120px] rounded-full mr-10"/>
                        <div>
                            <p className="text-4xl font-bold mb-4">Neflibata.</p>
                            <p className="text-base text-gray-500">admin@example.com</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="mb-2 font-bold text-base">上次登录时间:<span className="text-gray-500 ml-2">2025-01-01 12:00:00</span></p>
                        <p className="mb-2 font-bold text-base">上次登录IP:<span className="text-gray-500 ml-2">192.168.1.1</span></p>
                    </div>
                </Card>
                
                <Card>
                    <Table rowKey={"name"} columns={columns} dataSource={tableData} pagination={false}>

                    </Table>
                </Card>
            </Col>
            <Col span={16}>
                <div className="flex flex-wrap justify-between">
                    {
                        countData.map((item,index)=>{
                            return(
                                <Card key={index} className="flex items-center flex-1 min-w-[calc(33.333%-1rem)]" bodyStyle={{display: 'flex', paddingBottom: '10px',paddingTop: '10px', paddingLeft: '25px', paddingRight: '25px' }}>
                                    <div className="w-[80px] h-[80px] text-center leading-[80px] text-white rounded-tl-[5px] rounded-bl-[5px] text-[30px]" style={{backgroundColor: item.color}}>{iconToElement(item.icon)}</div>
                                    <div className="ml-5 mt-2">
                                        <p className="text-[25px] font-bold text-center">￥{item.value}</p>
                                        <p className="text-[12px] text-gray-500 text-center">{item.name}</p>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
                {/*因为echartsData需要调用完useEffect钩子函数之后才会获取 所以需要判断只有在echartsData存在的情况下才渲染页面 */}
                {echartsData.order && <MyEcharts chartData={echartsData.order} style={{height:'300px'}}/>}
                <div className="flex mt-[20px]">
                    {echartsData.user && <MyEcharts chartData={echartsData.user} style={{height:'240px',width:'50%'}}/>}
                    {echartsData.video && <MyEcharts chartData={echartsData.video} isAxisChart={false} style={{height:'240px',width:'50%'}}/>}
                </div>
            </Col>
        </Row>
    );
}
export default Home;