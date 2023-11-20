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

  let sql = `select * from userinfo`


  const param = []
  if (req.query.curr != null) {
    sql += ' limit ?';
    param.push(req.query.curr)
  } else {
    sql += ' ';
  }
  if (req.query.limit != null) {

    sql += ',?';
    param.push(req.query.limit)
  } else {
    sql += ''

  }
 
  let _countdata = await mysqlquery(sql, param.map(Number));
  for(let i=0;i<_countdata.length;i++){
    _countdata[i].order = i+1
  }
 

  let count = await mysqlquery('select count(1) a from userinfo');
 
  res.send({
    code: 200,
    data: {
      tablelable: {
        order:'序号',
        name: '姓名',
        age: '年龄',
        sex: '性别',
        date: '出生日期',
        address: '地址',
      },
      tabledata: {
        data: _countdata,
        count:count[0].a
      },
    },
    msg: '获取成功'
  })

})


module.exports = router