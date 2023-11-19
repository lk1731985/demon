 const userinfo = [
    {
        model: 'name',
        lable: '姓名',
        type: 'input',
        pl: '请输入姓名'
    },

    {
        model: 'age',
        lable: '年龄',
        type: 'input',
        pl: '请输入年龄'
    },

    {
        model: 'sex',
        lable: '性别',
        type: 'select',
        pl: '请选择性别',
        options: [
            {
                label: '男',
                value: '男'
            },
            {
                label: '女',
                value: '女'
            }
        ]

    },

    {
        model: 'date',
        lable: '出生日期',
        type: 'date-picker',
        pl: '请选择出生日期'
    },

    {
        model: 'address',
        lable: '地址',
        type: 'input',
        pl: '请输入地址'
    }

]
export default userinfo