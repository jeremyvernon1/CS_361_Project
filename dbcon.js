const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs361_vernonje',
    password        : '2434',
    database        : 'cs361_vernonje'
});

module.exports.pool = pool;
