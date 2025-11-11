import { Layout, Button,Avatar,Dropdown} from "antd";
import type { MenuProps } from 'antd';
const { Header } = Layout;
import { MenuFoldOutlined,MenuUnfoldOutlined } from "@ant-design/icons";
import logo from '../assets/user.jpg';
import { useDispatch } from "react-redux";
import { collapseMenu } from "../store/reducers/tab";


const logout = () => {
    console.log('退出');
}

//定义接受的函数参数
interface CommonHeaderProps {
    iscollapsed: boolean;
}

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" onClick={logout} rel="noopener noreferrer">
          退出
        </a>
      ),
    },
  ];

const CommonHeader = ({ iscollapsed }:CommonHeaderProps) => {

    //创建dispatch - Hook必须在组件内部调用
    const dispatch = useDispatch();

    //点击展开收起按钮所触发的函数
    const setCollapsed = () => {
        //获取store里面的状态信息，并调用collapseMenu函数，切换侧边栏折叠状态
        dispatch(collapseMenu());
    };
   
    return(
        <Header className="flex items-center justify-between">
            <Button
                type="text"
                icon={iscollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={setCollapsed}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 32,
                    backgroundColor:'#fff'
                }}
            />
            <Dropdown menu={{ items }} placement="bottom">
                <Avatar size={36} src={<img src={logo} />}/>
            </Dropdown>
        </Header>
    )
}

export default CommonHeader;
