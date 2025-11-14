import Mock from 'mockjs';
import homeApi from './mockServeData/home';
import userApi from './mockServeData/user';
import permissionApi from './mockServeData/permission';

//模拟后端接口

//拦截接口  (模糊匹配)
Mock.mock(/home\/userlist/,homeApi.getStatisticalData)

Mock.mock(/user\/getUser/,userApi.getUserList)

Mock.mock(/user\/addUser/,'post',userApi.createUser)

Mock.mock(/user\/editUser/,'post',userApi.updateUser)

Mock.mock(/user\/deleteUser/,'post',userApi.deleteUser)

Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)