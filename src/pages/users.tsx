import React,{useEffect,useState} from "react";
import {Button,Form,Input,Table,Popconfirm,Modal,InputNumber,Select,DatePicker } from 'antd';
import { getUserData,addUserData,editUserData,deleteUserData} from "../api";
import dayjs from "dayjs";



const Users:React.FC = () => {

    //创建Form实例
    const [form] =Form.useForm();

    const tableColumns=[
        {
            title:'姓名',
            dataIndex:'name'
        },
        {
            title:'年龄',
            dataIndex:'age'
        },
        {
            title:'性别',
            dataIndex:'sex',
            //通过render可以拿到对应的值
            render:(val:number)=>{
                return val ? '女':'男';
            }
        },
        {
            title:'出生日期',
            dataIndex:'birth'
        },
        {
            title:'地址',
            dataIndex:'addr'
        },
        {
            title:'操作',
            render: (rowData:any)=>{
            return(
                <div>
                    <Button className='mr-[5px]' onClick={()=>handleClick('edit',rowData)}>编辑</Button>
                    <Popconfirm
                        title="提示"
                        description="此操作将删除该用户，是否继续?"
                        okText='确认'
                        cancelText='取消'
                        onConfirm={()=>handleDelete(rowData)}
                    >
                        <Button type="primary" danger>删除</Button>
                    </Popconfirm>
                </div>
            )
            }
        }
    ]



    const [listData,setListData] = useState({
        name:''
    })

    // 数据列表的数据状态
    const [tableData,setTableData]=useState([]);
    //弹窗是新增还是编辑 的状态管理
    const [modalType,setModalType]=useState(0);
    //控制弹窗是否打开
    const [isModalOpen,setModalOpen]=useState(false);
    
    
    useEffect(()=>{
        //调用后端接口获取用户数据
        getTableData()
    },[])


    //新增/编辑
    const handleClick=(type:string,rowData?:any)=>{
        setModalOpen(!isModalOpen);
        if(type=='add'){
            setModalType(0);
        }else{
            setModalType(1);
            //这里需要对原有数据进行回填并进行修改
            //所以我们需要在不影响原有数据的基础上进行修改 所以需要对数据进行深拷贝
            const cloneData=JSON.parse(JSON.stringify(rowData));
            cloneData.birth=dayjs(cloneData.birth); //将日期转换成对象
            //表单数据回填
            form.setFieldsValue(cloneData); //数据需要和表单中的name属性要对应

        }

    }

    //删除
    const handleDelete=(data:any)=>{
        console.log(data.id)
        //userApi中的删除函数只需要一个id数据即可 并且我们要传递一个对象所以这里只需要将data.id包装成对象传入即可
        //第二种方法就是修改deleteUserData 让他自动将数据包装成对象
        deleteUserData(data.id).then(()=>{
        // deleteUserData({id:data.id}).then(()=>{
            //更新列表数据
            getTableData();            
        })
        
    }

    //提交
    const handleFinish=(e:{username:string})=>{
        console.log(e)
        setListData({
            name:e.username
        })
        //state数据更新是一个异步的过程 所以我们不能在这之后直接获取新的用户数据来更新
        //getTableData()
    }

    //所以我们需要用useEffect来监听listData的数据变化
    useEffect(()=>{
        getTableData()
    },[listData])

    //获取用户数据函数
    const getTableData=()=>{
        getUserData(listData).then(({data})=>{
            setTableData(data.list)
        })

    }



    //弹窗确定
    const handleOk=()=>{
        form.validateFields().then((val)=>{
            //日期格式 格式化
            val.birth=dayjs(val.birth).format('YYYY-MM-DD')
            // console.log(val)
            //调后端接口
            if (modalType){ //编辑
                editUserData(val).then(()=>{
                    //添加完数据后关闭窗口
                    handleCancel();
                    //更新列表数据
                    getTableData();
                })

            }else{      //新增
                addUserData(val).then(()=>{
                    //添加完数据后关闭窗口
                    handleCancel();
                    //更新列表数据
                    getTableData();
                })
            }
        }).catch((err)=>{
            console.log(err);
        })
    };
    //弹窗取消
    const handleCancel=()=>{
        setModalOpen(false);
        //清空表单数据
        form.resetFields();
    };



    return (
        <>
            <div>
                <div className="flex justify-between">
                    <Button type="primary" onClick={()=>handleClick('add')}>+新增</Button>
                    <Form layout="inline" onFinish={handleFinish}>
                        <Form.Item name={'username'}>
                            <Input placeholder="请输入用户名"></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary" >搜索</Button>
                        </Form.Item>
                    </Form>
                </div>
                <Table className="mt-[10px]" rowKey={'id'} dataSource={tableData} columns={tableColumns}>

                </Table>
                <Modal
                    open={isModalOpen} 
                    title={modalType ? '编辑用户':"新增用户"}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <Form labelCol={{span:6}} wrapperCol={{span:18}} labelAlign="left" form={form}>
                    {/* 只有当编辑的时候 表单还需要传回对应用户的id属性 */}
                    {
                        modalType&&<Form.Item name='id' hidden>
                            <Input/>
                        </Form.Item>
                    }
                        <Form.Item
                            label="姓名"
                            name="name"
                            rules={[
                                {
                                    required:true,
                                    message:"请输入姓名"
                                }
                            ]}>
                                <Input placeholder="请输入姓名"/>
                        </Form.Item>
                        <Form.Item
                            label="年龄"
                            name="age"    //这个name 一般是通过后端传来的参数名
                            rules={[
                                {
                                    required:true,
                                    message:"请输入年龄"
                                },
                                {
                                    type:'number',
                                    message:"年龄必须为整数"
                                }
                            ]}>
                                <InputNumber  style={{width:'150px'}} placeholder="请输入年龄"/>
                        </Form.Item>
                        <Form.Item
                            label="性别"
                            name="sex"
                            rules={[
                                {
                                    required:true,
                                    message:"请选择性别"
                                }
                            ]}>
                                <Select
                                    defaultValue="请选择性别"
                                    style={{width:'150px'}}
                                    options={[
                                        {value:0,label:'男'},
                                        {value:1,label:'女'}
                                    ]}
                                />
                        </Form.Item>
                        <Form.Item
                            label="日期"
                            name="birth"
                            rules={[
                                {
                                    required:true,
                                    message:"请选择出生日期"
                                }
                            ]}>
                                <DatePicker placeholder="请选择日期" format="YYYY-MM-DD"/>
                        </Form.Item>
                        <Form.Item
                            label="地址"
                            name="addr"
                            rules={[
                                {
                                    required:true,
                                    message:"请输入地址"
                                }
                            ]}>
                                <Input placeholder="请输入地址"/>
                        </Form.Item>
                    </Form>

                </Modal>
            </div>
        </>
    );
}
export default Users;