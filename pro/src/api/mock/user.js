import Mock from "mockjs";

export default {
  adduser: () => {

  },
  deluser: () => {

  },
  edituser: () => {

  },
  getuser: () => {
    return {
      data: {

        tablelable: {
          name: '姓名',
          age: '年龄',
          sex: '性别',
          date: '出生日期',
          address: '地址',
        },
        tabledata: Mock.mock({
          "data|500": [
            {
              "id": "@guid()",
              "name": "@cname()",
              "age": "@integer(1, 100)",
              'sex|1': ['男', '女'],
              "date": "@date",
              "address": "@county(true)"
            }
          ]
        })
      }

    }

  },

}