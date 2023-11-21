const express = require("express");
const router = express.Router();
const fn = require("../mock/mock")
const mysqlquery = require("../mysql/mysqlconfig")

//造数，拿到模拟数据写入数据库
router.get('/api/user/addall', async (req, res) => {

  const { tabledata } = fn.getuser().data


  sql1 = 'truncate table userinfo;'
  await mysqlquery(sql1);

  for (let i = 0; i < tabledata.data.length; i++) {
    let sql = `insert into userinfo(id,date,name,age,address,sex,user_id,menu,password) values('${tabledata.data[i].id}','${tabledata.data[i].date}','${tabledata.data[i].name}','${tabledata.data[i].age}','${tabledata.data[i].address}','${tabledata.data[i].sex}','${tabledata.data[i].user_id}','${tabledata.data[i].menu}','${tabledata.data[i].password}');`
    await mysqlquery(sql);

  }
  res.send('添加成功')

})

// 获取user 数据
router.get('/api/user/get', async (req, res) => {

  let sql = `select * from(
    select *,ROW_NUMBER()over(order by update_time desc) as rn from userinfo
    ) a  where 1=1`
  const { tabledata } = fn.getuser().data
  // console.log(tabledata)
  // rn>(${curr}-1)*${limit} and rn<=${curr}*${limit}
  const param = []
  if (req.query.curr != null && req.query.limit != null) {
    sql += ' and rn>(?-1)*?  ';
    param.push(req.query.curr)
    param.push(req.query.limit)
  } else {
    sql += ' ';
  }
  if (req.query.curr != null && req.query.limit != null) {
    sql += ' and rn<=?*?  ';
    param.push(req.query.curr)
    param.push(req.query.limit)
  } else {
    sql += ' ';
  }
  if (req.query.name != null ) {
    sql += ' and name like %?';
    param.push(req.query.name)
  }
  if (req.query.sex != null ) {
    sql += ' and sex=? ';
    param.push(req.query.name)
  } 

  let _countdata = await mysqlquery(sql, param);
 
  for (let i = 0; i < _countdata.length; i++) {
    _countdata[i].order = i + 1
  }

//

  const param1 = []
  let sql1 = `select count(1) a from(
    select *,ROW_NUMBER()over(order by update_time desc) as rn from userinfo
    ) a  where 1=1`
  if (req.query.curr != null && req.query.limit != null) {
    sql1 += ' and rn>(?-1)*?  ';
    param.push(req.query.curr)
    param.push(req.query.limit)
  } else {
    sql1 += ' ';
  }
  if (req.query.curr != null && req.query.limit != null) {
    sql1 += ' and rn<=?*?  ';
    param.push(req.query.curr)
    param.push(req.query.limit)
  } else {
    sql1 += ' ';
  }
  if (req.query.name != null ) {
    sql1 += ' and name like %?';
    param.push(req.query.name)
  }
  if (req.query.sex != null ) {
    sql1 += ' and sex=? ';
    param.push(req.query.name)
  } 



  let count = await mysqlquery(sql1, param1.map(Number));

  res.send({
    code: 200,
    data: {
      tablelable: {
        rn: '序号',
        name: '姓名',
        age: '年龄',
        sex: '性别',
        date: '出生日期',
        address: '地址',
      },
      tabledata: {
        data: _countdata,
        count: count[0].a
      },
    },
    msg: '获取成功'
  })

})

router.get('/api/user/del', async (req, res) => {
   let sql = '';
  let msg=''
  if (req.query.id != null) {
    sql+=' delete from userinfo where id=? ';
    msg='删除成功'
  } 
  else {
    sql += 'select 1';
    msg='删除失败'
  }
  await mysqlquery(sql, req.query.id);

  res.send({
    code: 200,
    msg: msg
  })

})

router.get('/api/user/eidt', async (req, res) => {
  const param = []
  let sql = 'update userinfo set';
  let msg = ''
  if (req.query.name != null) {
    sql += '  name=? ';
    msg = '更新成功'
    param.push(req.query.name)
  } 
  if (req.query.age != null) {
    sql += ' ,age=? ';
    msg = '更新成功'
    param.push(req.query.age)
  } 
  if (req.query.sex != null) {
    sql += ' ,sex=? ';
    msg = '更新成功'
    param.push(req.query.sex)
  } 
  if (req.query.date != null) {
    sql += ' ,date=? ';
    msg = '更新成功'
      
    param.push(req.query.date)
  } 
  if (req.query.address != null) {
    sql += ' ,address=? ';
    msg = '更新成功'
      
    param.push(req.query.address)
  } 
  if (req.query.id != null) {
    sql += ' where id=? ';
    msg = '更新成功'
      
    param.push(req.query.id)
  } else {
    sql += '';
    msg = '更新失败'
  }

  
  await mysqlquery(sql,param);
  res.send({
    code: 200,
    msg: msg
  })


})

router.get('/api/user/add', async (req, res) => {
  const param = []
  let sql = 'insert into userinfo(date,name,age,address,sex,id,user_id,password) values';
  let msg = ''
  if (req.query.name != null) {
    sql += '  (?,?,?,?,?,UUID(),round(RAND()*100000000),md5(rand()))';
    param.push(req.query.date)
    param.push(req.query.name)
    param.push(req.query.age)
    param.push(req.query.address)
    param.push(req.query.sex)
  } 
  // if (req.query.age!= null) {
  //   sql += '  (?,?,?,?,?,UUID(),round(RAND()*100000000),md5(rand()))';
  //   param.push(req.query.date)
  //   param.push(req.query.name)
  //   param.push(req.query.age)
  //   param.push(req.query.address)
  //   param.push(req.query.sex)
  // }
  // if (req.query.sex!= null) {
  //   sql += '  (?,?,?,?,?,UUID(),round(RAND()*100000000),md5(rand()))';
  //   param.push(req.query.date)
  //   param.push(req.query.name)
  //   param.push(req.query.age)
  //   param.push(req.query.address)
  //   param.push(req.query.sex)
  // }
  // if (req.query.date!= null) {
  //   sql += '  (?,?,?,?,?,UUID(),round(RAND()*100000000),md5(rand()))';
  //   param.push(req.query.date)
  //   param.push(req.query.name)
  //   param.push(req.query.age)
  //   param.push(req.query.address)
  //   param.push(req.query.sex)
  // }
  // if (req.query.address!= null) {
  //   sql += '  (?,?,?,?,?,UUID(),round(RAND()*100000000),md5(rand()))';
  //   param.push(req.query.date)
  //   param.push(req.query.name)
  //   param.push(req.query.age)
  //   param.push(req.query.address)
  //   param.push(req.query.sex)
  // }


  await mysqlquery(sql,param);

res.send('添加成功')

})
module.exports = router