const mysql = require('mysql');

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyecto',
    port: '8080'
});

conn.connect(function (err){
    if(err){
        console.log(err);
        return;
    } else {
        console.log('La base de datos está conectada')
    }
});

module.exports = conn;