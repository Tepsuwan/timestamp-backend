const mysql = require('mysql');


// Mysql Connection
const connection = mysql.createConnection({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'baezenic_people',
    debug    :  false
})

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Mysql database', err)
        return ;
    } //console.log("2");
})

// Mysql Connection
const connection2 = mysql.createConnection({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bz_timestamp',
    debug    :  false
})

connection2.connect((err) => {
    if (err) {
        console.log('Error connecting to Mysql database', err)
        return ;
    }
})

module.exports =  connection 