
(function () {
    'use strict';

    var html = '<div style="display: inline; float: left" class="statusPanel"><div class="trafficLights" style="text-align: center;">' +
        '<object id="svg1" type="image/svg+xml" data="img/lights.svg">Your browser doesn\'t support objects.</object>' +
        '</div></div>';

    var statusTimeout = 1000; // xxx

    function StatusPanel(id, name, url) {
        this.id = id;
        this.name = name;
        this.url = url;
        function checkURL() {
            $.ajax({
                url: this.url,
                complete: onComplete,
                success: onSuccess,
                error: onError,
                statusCode: {
                    404: function() {
                      alert( "page not found" );
                    }
                }
            });
        }
        function onSuccess() { alert("onSuccess"); }
        function onComplete() { alert("onComplete: " + url); }
        function onError() { alert("onError"); }

        setTimeout(checkURL, statusTimeout);
    }

    var statusPanel1 = new StatusPanel(1, "Test", "http://localhost:8080/status");

    var svg = document.getElementById('svg1');

    function onClickInstantiate() {
        console.log('Instantiate button clicked');
        var panel = new StatusPanel(1, "Test", "http://localhost:8080/status");
        // var div = document.createElement('div'),
        //     p = document.createElement('p'),
        //     text = document.createTextNode('stuff');
        // div.appendChild(p.appendChild(text));
        // div.setAttribute('id', 'statusPanel');
        // // $('#statusContainer').append(div);
        // $('#statusContainer').append(html);
    }   

    function onClickCreate() {
        console.log('Create button clicked');
        var div = document.createElement('div'),
            p = document.createElement('p'),
            text = document.createTextNode('stuff');
        div.appendChild(p.appendChild(text));
        div.setAttribute('id', 'statusPanel');
        // $('#statusContainer').append(div);
        $('#statusContainer').append(html);
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
    $('#instantiateStatusPanel').on('click', onClickInstantiate);

    $().ready(function () { //$(document).ready(
        console.log('Document ready');
        var LOCAL = false;
        var loc = location.toString().split('://')[1]; // strip off http://, https://
        if (loc.substr(0, 9) === 'localhost') { // served locally
            LOCAL = true;
        }
        console.log('LOCAL: ' + LOCAL);
    });

    debugger;
}());

console.log('main.js ready');
