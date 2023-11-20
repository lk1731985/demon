import http from '../util/request'
//首页数据
export const getHomeInfo = () => {
  return http.get('/home/info')
}

export const adduser = (data) => {
  return http.post('/user/add', data)
}
export const deluser = (data) => {
  return http.post('/user/del', data)
}
export const edituser = (data) => {
  return http.post('/user/edit', data)
}
export const getuser = (param) => {

  return http.get('/user/get', param)
}

export const getMenu = (param) => {
  return http.post('/promission/getMenu', param)
}
