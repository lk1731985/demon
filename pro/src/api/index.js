import http from '../util/request'
//首页数据
export const getHomeInfo = () => {
  return http.get('/home/info')
}

export const adduser = (data) => {
  return http.get('/user/add', data)
}
export const deluser = (data) => {
  return http.get('/user/del', data)
}
export const edituser = (data) => {
  return http.get('/user/eidt', data)
}
export const getuser = (param) => {

  return http.get('/user/get', param)
}

//菜单数据
export const getMenu = (param) => {
  return http.post('/promission/getMenu', param)
}
