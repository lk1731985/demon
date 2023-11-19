const express = require("express");
const router = express.Router();
const fn = require("../mock/mock")
const mysqlquery = require("./mysqlconfig")


//造数，拿到模拟数据写入数据库
router.get('/api/user/addall', async (req, res) => {
 
  const { tabledata } = fn.getuser().data


    sql1 = 'truncate table userinfo;'
    await mysqlquery(sql1);
  
    for (let i = 0; i < tabledata.data.length; i++) {
      let sql = `insert into userinfo(id,date,name,age,address,sex) values('${tabledata.data[i].id}','${tabledata.data[i].date}','${tabledata.data[i].name}','${tabledata.data[i].age}','${tabledata.data[i].address}','${tabledata.data[i].sex}');`
       await mysqlquery(sql);
     
    }
  res.send('添加成功')

})

// user 数据模拟
router.get('/api/user/get', async (req, res) => {

  let sql = `select * from userinfo;`
  let _countdata=await mysqlquery(sql);
  
  res.send({
    code: 200,
    data:{
      tablelable: {
        name: '姓名',
        age: '年龄',
        sex: '性别',
        date: '出生日期',
        address: '地址',
    },
    tabledata:{data:_countdata},
    },
    msg: '获取成功'
  })
  
})


module.exports = router