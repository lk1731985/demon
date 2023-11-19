import Mock from "mockjs";
import home from "./mock/home";
import user from "./mock/user";
const baseUrl = 'api'
//首页数据 mock拦截请求
// Mock.mock(`/${baseUrl}/home/info`, home.getData)

//用户列表数据
Mock.mock(`/${baseUrl}/user/add`, 'post', user.adduser)
Mock.mock(`/${baseUrl}/user/del`, 'post', user.deluser)
Mock.mock(`/${baseUrl}/user/edit`, 'post', user.edituser)
// Mock.mock(`/${baseUrl}/user/get`, user.getuser)

