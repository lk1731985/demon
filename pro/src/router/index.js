import Vue from "vue";
import VueRouter from "vue-router";

// 防止重复跳转出错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//1.导⼊


//2.模块化机制 使⽤Router
Vue.use(VueRouter)

//3.创建路由器对象

const router = new VueRouter({
    mode: 'history',
    routes: [
        {

            path: '/', name: 'layout', component: () => import('../views/layout.vue'),redirect: '/home',

            children: [
                // { path: '/home', name: 'home', component: () => import('../views/home.vue') },
                // { path: '/mall', name: 'mall', component: () => import('../views/mall.vue') },
                // { path: '/user', name: 'user', component: () => import('../views/user.vue') },
                // { path: '/page1', name: 'page1', component: () => import('../views/page1.vue') },
                // { path: '/page2', name: 'page2', component: () => import('../views/page2.vue') },

            ],


        },
        { path: '/login', name: 'login', component: () => import('../views/login.vue') },
        // {
        //     name: '404',
        //     path: '/404',
        //     component: () => import('../views/404.vue'),
        // },
        // {
        //     path: '*',
        //     redirect: {
        //         name: "404"
        //     }
        // }


    ]
})
// router.beforeEach((to, from, next) => {
//     //NProgress.start();
//     next();
// })
export default router