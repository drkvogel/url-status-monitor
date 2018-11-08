
(function () {
    'use strict';


    var html = '<div class="statusPanel"><div class="trafficLights" style="text-align: center;">' +
        '<object id="svg1" type="image/svg+xml" data="img/traffic-lights-vscode.svg">Your browser doesn\'t support objects.</object>' +
        '</div></div>';

    var svg = document.getElementById('svg1');

    function onClickCreate() {
        console.log('Create button clicked');
        var div = document.createElement('div');
        var p = document.createElement('p');
        var text = document.createTextNode('stuff');
        p.appendChild(text);
        div.appendChild(p);
        // div.appendChild(p).appendChild(text);
        $('#statusContainer').append(div);
        // var redLight = svg.contentDocument.getElementById('redLight');
        // $(redLight).css('fill', 'white');
    }   

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
    $('#createStatusPanel').on('click', onClickCreate);

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
