import Vue from 'vue'
import App from './App.vue'
// import {Button,row} from 'element-ui'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router/index.js';

import store from './store';
import * as echarts from 'echarts';
import Cookies from 'js-cookie';
Vue.prototype.$echarts = echarts

import '@/api/mock'

Vue.config.productionTip = false

//按需引入
// Vue.use(Button);
// Vue.use(row);

Vue.use(ElementUI);

//全局前置守卫
router.beforeEach((to, from, next) => {

  // 如果token不存在跳转登录页面
  const token = Cookies.get('token')
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }

})


new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')

