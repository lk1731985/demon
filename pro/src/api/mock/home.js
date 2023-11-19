
import Mockjs from "mockjs";
let list = [];
export default {
    getData: () => {
        for (let i = 0; i < 100; i++) {
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
}