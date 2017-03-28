const remote = require('electron').remote
const main   = remote.require('./main.js')


/**
 * Clock
 */
function update() {
    today   = new Date();
    hours   = today.getHours();
    minutes = today.getMinutes();
    seconds = today.getSeconds();

    if (hours > 12) {
        hours = hours % 12;
    }

    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }

    $('#js-hour').text(hours);
    $('#js-min').text(minutes);
    $('#js-sec').text(seconds);
}

update()
setInterval(update, 1000)


/**
 * Input code
 */
$('.js-input-code').hide();
$('.js-action-button').prop('disabled', true);

var inputCodeCounter = 0;
$('.btn-number').on('click', function(){
    var value       = $(this).data('value');
    var currentCode = $('.input-code').attr('data-code');

    if (value == 'delete') {
        if (inputCodeCounter > 0) {
            $('#js-input-code-' + inputCodeCounter).hide();
            $('.js-action-button').prop('disabled', true);
            $('.input-code').attr('data-code', currentCode.slice(0, -1));
            inputCodeCounter--;
        }
        return;
    } else if (value == 'clear') {
        $('.js-input-code').hide();
        $('.js-action-button').prop('disabled', true);
        $('.input-code').attr('data-code', '');
        inputCodeCounter = 0;
        return;
    }

    if (inputCodeCounter > 3) {
        return;
    }

    inputCodeCounter++;
    $('#js-input-code-' + inputCodeCounter).show();

    /* update input-code */
    $('.input-code').attr('data-code', currentCode + '' + value);

    if (inputCodeCounter == 4) {
        $('.js-action-button').prop('disabled', false);
    }
});


/**
 * Action button
 */
$('.js-action-button').on('click', function(){
    $('.js-input-code').hide();
    $('.js-action-button').prop('disabled', true);
    inputCodeCounter = 0;
});
