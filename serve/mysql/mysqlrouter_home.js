const express = require("express");
const router = express.Router();
const fn = require("../mock/mock")
const mysqlquery = require("./mysqlconfig")


//造数，拿到模拟数据写入数据库
router.get('/api/home/addall', async (req, res) => {
 
  const { countdata, tableData, lineData, barData, pieData } = fn.getData().data
  const tableConfig = [
    'countdata',
    'tableData',
    'tableData',
    'lineData',
    'barData',
    'pieData'
  ]
   tableConfig.forEach(async item => {
    sql = `truncate table ${item};`
    await mysqlquery(sql);
  })
  
  for (let i = 0; i < countdata.length; i++) {
    let sql = `insert into countdata(name,count,icon,clolor) values('${countdata[i].name}','${countdata[i].count}','${countdata[i].icon}','${countdata[i].clolor}');`
    await mysqlquery(sql);
  }
  for (let i = 0; i < tableData.length; i++) {
    let sql = `insert into tableData(id,date,name,age,address) values('${tableData[i].id}','${tableData[i].date}','${tableData[i].name}','${tableData[i].age}','${tableData[i].address}');`
    await mysqlquery(sql);
  }
  for (let i = 0; i < lineData.list.length; i++) {
    let sql = `insert into lineData(id,name,value1,value2) values('${lineData.list[i].id}','${lineData.list[i].name}','${lineData.list[i].value1}','${lineData.list[i].value2}');`
    await mysqlquery(sql);
  }

  for (let i = 0; i < barData.list.length; i++) {
    let sql = `insert into barData(id,name,value1,value2) values('${barData.list[i].id}','${barData.list[i].name}','${barData.list[i].value1}','${barData.list[i].value2}');`
    await mysqlquery(sql);
  }
  for (let i = 0; i < pieData.list.length; i++) {
    let sql = `insert into pieData(id,name,value) values('${pieData.list[i].id}','${pieData.list[i].name}','${pieData.list[i].value}');`
    await mysqlquery(sql);
  }
  res.send('添加成功')

})


// home 数据数据库请求
router.get('/api/home/info', async (req, res) => {

  let _countdata= await mysqlquery(`select * from  countdata;`);
  let _tableData= await mysqlquery(`select * from  tableData;`);
  let _lineData= await mysqlquery(`select * from  lineData;`);
  let _barData= await mysqlquery(`select * from  barData;`);
  let _pieData= await mysqlquery(`select * from  pieData;`);
  
  res.send({
    code: 200,
    data:{
      countdata:_countdata,
      tableData:_tableData,
      lineData:{list:_lineData},
      barData:{list:_barData},
      pieData:{list:_pieData}
    },
    msg: '获取成功'
  })
  
})




module.exports = router