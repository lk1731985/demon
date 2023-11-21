const Mockjs = require('mockjs');
// 测试数据
let test = () => {
    return Mockjs.mock({
        'userinfo|10': [{
            'id': '@increment(1)',
            username: '@cname()',
            date: '@date()',
            pic: "@image('200x100', '#4A7BF7')" + "&text=" + "@cname()",
            description: "@cword(100)",
            ip: "@ip()",
            email: "@email()",
            address: '@county(true)',
            url: "@url",
            title: "@cword(8)"
        }]

    })
}


//首页
let list = [];
let getData = () => {
    for (let i = 0; i < 200; i++) {
        list.push(Mockjs.mock({
            "id": i + 1,
            "date": "@date('yyyy-MM-dd')",
            "name": "@cname",
            "age": Mockjs.Random.integer(18, 60),
            "address": "@county()",

        }))
    }
    return {
        code: 200,
        data: {
            countdata: [
                {
                    name: Mockjs.mock('@ctitle(2,5)'),
                    count: Mockjs.Random.integer(10, 10000),
                    icon: "umbrella",
                    clolor: Mockjs.mock('@color')
                },
                {
                    name: Mockjs.mock('@ctitle(2,5)'),
                    count: Mockjs.Random.float(0, 1, 1, 2),
                    icon: "monitor",
                    clolor: Mockjs.mock('@color')
                },
                {
                    name: Mockjs.mock('@ctitle(2,5)'),
                    count: Mockjs.Random.float(0, 1, 1, 2),
                    icon: "remove",
                    clolor: Mockjs.mock('@color')
                },
                {
                    name: Mockjs.mock('@ctitle(2,5)'),
                    count: Mockjs.Random.float(0, 1, 1, 2),
                    icon: "folder",
                    clolor: Mockjs.mock('@color')
                },
                {
                    name: Mockjs.mock('@ctitle(2,5)'),
                    count: Mockjs.Random.integer(10, 10000),
                    icon: "house",
                    clolor: Mockjs.mock('@color')
                },
                {
                    name: Mockjs.mock('@cword(3)'),
                    count: Mockjs.Random.integer(10, 10000),
                    icon: "coin",
                    clolor: Mockjs.mock('@color')
                },

            ]
            ,
            tableData: list,
            lineData:
                Mockjs.mock({
                    'list|10': [{
                        'id|+1': 1,
                        'name': '@cword(3)',
                        "value1": '@float(1, 1000, 2, 2)',
                        "value2": '@float(1, 1000, 2, 2)',
                    }]

                }),
            barData: Mockjs.mock({
                'list|10': [{
                    'id|+1': 1,
                    'name': '@cword(3)',
                    "value1": '@float(1, 1000, 2, 2)',
                    "value2": '@float(1, 1000, 2, 2)',
                }]

            }),
            pieData: Mockjs.mock({
                'list|9': [{
                    'id|+1': 1,
                    'name': '@cword(3)',
                    "value": '@float(1, 1000, 2, 2)',
                }]

            }),
        }
    }
}


// 用户管理

let adduser = () => {

}
let deluser = () => {

}
let edituser = () => {

}
let getuser = () => {
    return {
        data: {
            tablelable: {
                name: '姓名',
                age: '年龄',
                sex: '性别',
                date: '出生日期',
                address: '地址',
            },
            tabledata: Mockjs.mock({
                "data|500": [
                    {
                        "id": "@guid()",
                        "user_id|4": /[1-9][0-9]/,
                        "name": "@cname()",
                        "age": "@integer(19, 60)",
                        'sex|1': ['男', '女'],
                        "date": "@date('yyyy-MM-dd')",
                        "address": "@county(true)",
                        'menu':[],
                        "password": '@string(8)'
                    }
                ]
            })
        }

    }

}


module.exports = { test, getData, adduser, deluser, edituser, getuser }