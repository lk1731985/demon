import Mcokjs from "mockjs";
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body);
        //先判断用户是否存在
        //判断账号和密码是否对应
        if (username === 'admin' && password === '123456') {
            return {
                code: 200,
                menu: [
                    {
                        path: "/home",
                        name: "home",
                        label: "首页",
                        icon: "s-home",
                        url: "home.vue",
                    },
                    {
                        path: "/mall",
                        name: "mall",
                        label: "商品管理",
                        icon: "video-play",
                        url: "mall.vue",
                    },
                    {
                        path: "/user",
                        name: "user",
                        label: "用户管理",
                        icon: "user",
                        url: "user.vue",
                    },

                    {
                        label: "其他",
                        icon: "location",
                        children: [
                            {
                                path: "/page1",
                                name: "page1",
                                label: "页面1",
                                icon: "s-promotion",
                                url: "page1.vue",
                            },
                            {
                                path: "/page2",
                                name: "page2",
                                label: "页面2",
                                icon: "s-promotion",
                                url: "page2.vue",
                            },
                        ],
                    },
                ],
                token: Mcokjs.Random.guid(),
                msg: "获取成功"
            }
        } else if (username === 'xiaoxiao' && password === '123456') {
            return {
                code: 200,
                menu: [
                    {
                        path: "/home",
                        name: "home",
                        label: "首页",
                        icon: "s-home",
                        url: "home.vue",
                    },
                    {
                        path: "/mall",
                        name: "mall",
                        label: "商品管理",
                        icon: "video-play",
                        url: "mall.vue",
                    },
                ],
                token: Mcokjs.Random.guid(),
                msg: "获取成功"
            }
        }
        else {
            return {
                code: 401,
                msg: "账号或密码错误"
            }
        }
    },
}