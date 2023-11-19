import Vue from 'vue'
import App from './App.vue'
// import {Button,row} from 'element-ui'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router/index.js';

import store from './store';
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

import '@/api/mock'

Vue.config.productionTip = false

//按需引入
// Vue.use(Button);
// Vue.use(row);

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

