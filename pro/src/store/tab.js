import Cookies from "js-cookie";
export default {
    state: {
        isCollapse: false, //控制菜单收起
        tabsList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ],//面包屑数据
        menu: []
    },
    mutations: {
        //修改菜单收起状态
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },

        //添加header菜单
        selectMenu(state, val) {

            //不是首页,并且不存在 增加内容
            if (val.name !== 'home') {
                if (state.tabsList.findIndex(item => item.name === val.name) == -1) {
                    state.tabsList.push(val);
                }
            }

        },
        //删除header菜单
        deleteMenu(state, val) {
            let index = state.tabsList.findIndex(item => item.name === val.name);
            state.tabsList.splice(index, 1);
        },
        //根据不同用户获取左侧菜单
        setMenu(state, val) {
            state.menu = val;
            //页面刷新保存到cookie中，cookie是要是字符串
            Cookies.set('menu', JSON.stringify(val));
        },
        //动态注册路由
        addMenu(state, router) {
            //动态注册路由
            //router在不在cookie中
            if (Cookies.get('menu')) {
                //如果存在cookie中，就将cookie中的数据转成json对象
                let menu = JSON.parse(Cookies.get('menu'));

                //将数据更新到state中
                state.menu = menu;
                const menuArray = []

                menu.forEach(item => {
                    //有子菜单
                    if (item.children) {
                        item.children = item.children.map(item => {
                            item.component = () => import(`../views/${item.url}`)
                            return item
                        })
                        menuArray.push(...item.children)
                    }
                    else {
                        item.component = () => import(`../views/${item.url}`)
                        menuArray.push(item)
                    }
                })

                // console.log(menuArray)
                //漏油动态添加
                menuArray.forEach(item => {
                    router.addRoute('layout', item)
                })
            }
        }
    }
}