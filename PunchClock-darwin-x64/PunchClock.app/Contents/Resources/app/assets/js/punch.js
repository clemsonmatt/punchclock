const remote = require('electron').remote
const main   = remote.require('./main.js')

/* action button clicked */
$('.js-action-button').on('click', function(){
    var code = $('.input-code').attr('data-code');

    /* check for valid code */
    loginCheck(code, function(person){
        if (person.length == 0){
            /* invalid passcode */
            $('#js-invalid-login').show();
            $('.input-code').attr('data-code', '');

            setTimeout(function() {
                $('#js-invalid-login').hide();
            }, 3000);
        } else {
            /* success */

            /**
             * TODO:
             *    - log the person, time, and action in a table
             *    - perform checks to make sure the action is acceptable
             */

            $('#js-success-login').show();
            $('.input-code').attr('data-code', '');

            setTimeout(function() {
                $('#js-success-login').hide();
            }, 3000);
        }
    });
});

/**
 * Check for correct login
 */
function loginCheck(passcode, callback) {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'matte',
        password : 'password',
        database : 'punchclock'
    });

    connection.connect();

    connection.query({
        sql:    'SELECT * FROM people WHERE passcode = ?',
        values: [passcode]
    }, function (error, results, fields) {
        /* return the results -- a person */
        callback(results);
    });

    connection.end();
}
