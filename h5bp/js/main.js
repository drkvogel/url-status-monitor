
(function () { // Immediately-Invoked Function Expression (IIFE) / Anonymous closure: hide vars from global namespace
    // used to set "use strict" for whole scope so jslint doesn't complain, but then have to indent whole scope...
    'use strict';
    var svg = document.getElementById('svg1');

    function onClickRedButton() {
        console.log('Red button clicked');
        var redLight = svg.contentDocument.getElementById('redLight');
        $(redLight).css('fill', 'white');
    }
    
    function onClickGreenButton() {
        console.log('Green button clicked');
        var greenLight = svg.contentDocument.getElementById('greenLight');
        $(greenLight).css('fill', 'white');
    }

    $('#redButton').on('click', onClickRedButton);
    $('#greenButton').on('click', onClickGreenButton);

    $().ready(function () { //$(document).ready(
        console.log('Document ready');
        var LOCAL = false;
        var loc = location.toString().split('://')[1]; // strip off http://, https://
        if (loc.substr(0, 9) === 'localhost') { // served locally
            LOCAL = true;
        }
        console.log('LOCAL: ' + LOCAL);
    });
}());

console.log('main.js ready');
