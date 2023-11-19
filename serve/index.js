const express = require("express");
const app = express();

const mysqlrouter_home =require("./mysql/mysqlrouter_home.js")
const mysqlrouter_user =require("./mysql/mysqlrouter_user.js")


const mockrouter = require("./mock/mockrouter.js")

/*为app添加中间件处理跨域请求*/
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//路由
app.use(mysqlrouter_home)
app.use(mysqlrouter_user)

app.use(mockrouter)


app.use(function (req, res) {
    res.sendFile(__dirname + "/" + "404.html");
});

// 监听8888端口
app.listen(8888, () => {
    console.log('服务启动,http://localhost:8888');
})



