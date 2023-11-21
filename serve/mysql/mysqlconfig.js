
const mysqlq = require('mysql')

// const mysqlpool = mysqlq.createPool(
//     {
//         // connectionLimit: 10,
//         host: 'localhost',//对应服务器，如果是本地，则为localhost
//         user: 'root',
//         password: '',
//         port: '3306',
//         database: 'demo'
//     })

const mysqlpool = mysqlq.createPool(
    {
        // connectionLimit: 10,
        host: 'localhost',//对应服务器，如果是本地，则为localhost
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'test_api'
    })

const mysqlquery = (sql, value) => {
    return new Promise((resolve, reject) => {
        mysqlpool.getConnection(function (err, conn) {
            conn.query(sql, value, (err, result) => {
                if (err) { reject(err) }
                else {
                    console.log(sql)
                    resolve(result)
                }

            })
            conn.release();
        })

    })
}
module.exports = mysqlquery;
