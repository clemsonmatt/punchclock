var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'matte',
    password : 'password',
    database : 'punchclock'
});
