// 导入MySQL模块
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gamedb'
});

db.connect();

module.exports = db;