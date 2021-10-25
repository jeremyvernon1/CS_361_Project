const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'oniddb.cws.oregonstate.edu',
    user            : 'vernonje-db',
    password        : 'guE2ZCYtz5fbWWqF',
    database        : 'vernonje-db'
});

module.exports.pool = pool;
