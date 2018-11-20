
// (function () {
    'use strict';

    var html = '<div style="display: inline; float: left" class="statusPanel"><div class="trafficLights" style="text-align: center;">' +
        '<object id="svg1" type="image/svg+xml" data="img/lights.svg">Your browser doesn\'t support objects.</object>' +
        '</div></div>';

    var statusTimeout = 1000; // xxx

    function StatusPanel(id, name, url, freq) {
        this.id = id;
        this.name = name;
        this.url = url;
        console.log('StatusPanel(id = ' + id + ', name='+name+', url='+this.url+', freq='+freq+')');
        function render() {
            var div = document.createElement('div'),
            p = document.createElement('p'),
            text = document.createTextNode(name);
            div.appendChild(p.appendChild(text));
            div.setAttribute('id', 'statusPanel'+id);
            $('#statusContainer').append(div);
        }
        function checkURL() {
            console.log('checkUrl(): ' + url);
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
        function onSuccess() { console.log("light id "+id+" onSuccess"); }
        function onComplete() { console.log("light id "+id+" checked url: " + url); }
        function onError() { alert("onError"); }

        render();
        setTimeout(checkURL, freq * 100);  // just once for testing
        // setInterval(checkURL, freq * 1000);
    }

    //var statusPanel1 = new StatusPanel(1, "Test", "http://localhost:8080/status");

    var svg = document.getElementById('svg1');

    function onClickInstantiate() {
        console.log('Instantiate button clicked');
        var panel = new StatusPanel(1, "Test", "http://localhost:8080/status", 10);
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
        $.getJSON("/getconfig?id=1", function(data) {
            console.log('got data: ' + data);
            $.each(data, function(i, light) {
                console.log('object: ' + i);
                // var freq = object.freq, url = object.url;
                // console.log('freq: ' + freq + ', url: '+ url);
                var panel = new StatusPanel(light.id, light.name, light.url, light.freq);
                // $.each(object, function(j, value) {
                //     console.log(j + '=' + value);
                // })
            })
        })
        // var LOCAL = false;
        // var loc = location.toString().split('://')[1]; // strip off http://, https://
        // if (loc.substr(0, 9) === 'localhost') { // served locally
        //     LOCAL = true;
        // }
        // console.log('LOCAL: ' + LOCAL);
    });

    // debugger;
// }());

console.log('main.js ready');
