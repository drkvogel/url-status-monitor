
(function () { // Immediately-Invoked Function Expression (IIFE) / Anonymous closure: hide vars from global namespace
    // used to set "use strict" for whole scope so jslint doesn't complain, but then have to indent whole scope...
    'use strict';
    var svg = document.getElementById('svg1');
    // var group = svg.contentDocument.getElementById(this.id); // as callback is a closure, has access to enclosing scope (this)
    // var circles = group.getElementsByTagName('circle');

    function onClickRedButton() {
        console.log('Red button clicked');
        // var svg = document.getElementById('svg1');
        // console.log(svg);
        var redLight = svg.contentDocument.getElementById('redLight');
        // console.log(redLight);
        // var circles = group.getElementsByTagName('circle');
        // $(redLight).attr('style', 'fill: white');
        $(redLight).css('fill', 'white');
    }
    
    function onClickGreenButton() {
        console.log('Green button clicked');
        // var svg = document.getElementById('svg1');
        // console.log(svg);
        var greenLight = svg.contentDocument.getElementById('greenLight');
        // console.log(redLight);
        // var circles = group.getElementsByTagName('circle');
        // $(redLight).attr('style', 'fill: white');
        $(greenLight).css('fill', 'white');
    }

    $('#redButton').on('click', onClickRedButton);
    $('#greenButton').on('click', onClickGreenButton);

    $().ready(function () { //$(document).ready(
        console.log('Document ready');
        //hideDiv('devBar');
        // $('#devBar').hide();
        // if (LIVE) {
        //     window.onbeforeunload = null;
        //     window.history.forward();   // prevent repeat after back button - may not work
        //     window.onbeforeunload = function() { return 'Progress will be lost - are you sure?'; };
        // }
        var LOCAL = false;
        var loc = location.toString().split('://')[1]; // strip off http://, https://
        if (loc.substr(0, 9) === 'localhost') { // served from gulp
            LOCAL = true;
        }
        console.log('LOCAL: ' + LOCAL);
        // getConfig();
    });
}());

console.log('main.js ready');
