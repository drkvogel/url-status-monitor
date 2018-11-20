
// (function () {
    'use strict';

    var html = '<div style="display: inline; float: left" class="statusPanel"><div class="trafficLights" style="text-align: center;">' +
        '<object id="svg1" type="image/svg+xml" data="img/lights.svg">Your browser doesn\'t support objects.</object>' +
        '</div></div>';

    var statusTimeout = 1000; // xxx

    function StatusPanel(id, name, url, freq, parent) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.freq = freq; //?
        this.parent = parent;

        function render() {
            var div = document.createElement('div'),
                p = document.createElement('p'),
                text = document.createTextNode(name),
                object = document.createElement('object');
            // div.setAttribute('style', 'display: inline; float: left'); 
            div.setAttribute('class', 'statusPanel');
            div.setAttribute('id', 'statusPanel'+id);
            object.setAttribute('id', 'svg');
            object.setAttribute('type', 'image/svg+xml');
            object.setAttribute('data', 'static/img/lights.svg');
            div.appendChild(object);
            p.appendChild(text)
            div.appendChild(p);
            // div.appendChild(p.appendChild(text)); // doesn't work
            $(parent).append(div);
        }

        function checkURL() {
            console.log('checkUrl(): ' + url);
            $.ajax({
                url: url,
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
        
        console.log('StatusPanel(id = ' + id + ', name='+name+', url='+this.url+', freq='+freq+')');
        render();
        setTimeout(checkURL, freq * 100);  // just once for testing
        // setInterval(checkURL, freq * 1000);
    }

    
    function onClickInstantiate() {
        console.log('Instantiate button clicked');
        var panel = new StatusPanel(1, "Test", "http://localhost:8080/status", 10, '#statusContainer');
    }   
    
    function onClickCreate() {
        console.log('Create button clicked');
        // var div = document.createElement('div'),
        // p = document.createElement('p'),
        // text = document.createTextNode('stuff');
        // div.appendChild(p.appendChild(text));
        // div.setAttribute('id', 'statusPanel');
        // $('#statusContainer').append(div);
        $('#statusContainer').append(html);
    }   
    
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
    $('#createStatusPanel').on('click', onClickCreate);
    $('#instantiateStatusPanel').on('click', onClickInstantiate);

    $().ready(function () { //$(document).ready(
        console.log('Document ready');
        var containerDiv = '#statusContainer';
        $.getJSON("/getconfig?id=1", function(data) {
            // console.log('got data: ' + data);
            $.each(data, function(i, light) {
                var panel = new StatusPanel(light.id, light.name, light.url, light.freq, containerDiv);
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

// cruft

                // console.log('object: ' + i);
                // var freq = object.freq, url = object.url;
                // console.log('freq: ' + freq + ', url: '+ url);
               // $.each(object, function(j, value) {
                //     console.log(j + '=' + value);
                // })