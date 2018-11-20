
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

        var redLight, grnLight;

        this.render = function() {
            var div = document.createElement('div'),
                p = document.createElement('p'),
                text = document.createTextNode(name),
                object = document.createElement('object');
            div.setAttribute('class', 'statusPanel');
            div.setAttribute('id', 'statusPanel'+id);
            object.setAttribute('id', 'svg'+id);
            object.setAttribute('type', 'image/svg+xml');
            object.setAttribute('data', '/static/img/lights.svg');
            div.appendChild(object);
            p.appendChild(text)
            div.appendChild(p);
            $(parent).append(div);
            // this.redLight = object.contentDocument.getElementById('redLight'); // doesn't seem to work at this point
            // this.grnLight = object.contentDocument.getElementById('grnLight');
        }
        // var svg = document.getElementById('svg1');

        this.dimRed = function() {
            var svg = document.getElementById('svg'+this.id);
            var redLight = svg.contentDocument.getElementById('redLight');
            // this.redLight = object.contentDocument.getElementById('redLight'); // doesn't seem to work at this point
            // this.grnLight = object.contentDocument.getElementById('grnLight');
            $(redLight).css('fill', 'white');
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
        function onError() { alert("onError: url: "+url); }
        
        console.log('StatusPanel(id = ' + id + ', name='+name+', url='+this.url+', freq='+freq+')');
        this.render();
        // this.dimRed();
        setTimeout(checkURL, freq * 100);  // just once for testing
        // setInterval(checkURL, freq * 1000);
    }

    // StatusPanel.prototype = {
    //     dimRed: function() {
    //         $(redLight).css('fill', 'white');
    //     }
    // }
    
    function onClickInstantiate() {
        console.log('Instantiate button clicked');
        var panel = new StatusPanel(1, "Test", "http://localhost:8080/status", 10, '#statusContainer');
    }   
    
    function onClickCreate() {
        console.log('Create button clicked');
        $('#statusContainer').append(html);
    }   
    
    // var svg = document.getElementById('svg1');

    function onClickRedButton() {
        console.log('Red button clicked');
        var redLight = svg.contentDocument.getElementById('redLight');
        $(redLight).css('fill', 'white');
    }
    
    function onClickGreenButton() {
        console.log('Green button clicked');
        var greenLight = svg.contentDocument.getElementById('grnLight');
        $(greenLight).css('fill', 'white');
    }

    $('#redButton').on('click', onClickRedButton);
    $('#greenButton').on('click', onClickGreenButton);
    $('#createStatusPanel').on('click', onClickCreate);
    $('#instantiateStatusPanel').on('click', onClickInstantiate);

    var panels = [];

    $().ready(function () { //$(document).ready(
        // console.log('Document ready');
        var containerDiv = '#statusContainer';
        $.getJSON("/getconfig?id=1", function(data) {
            $.each(data, function(i, light) {
                panels[i] = new StatusPanel(light.id, light.name, light.url, light.freq, containerDiv);
            })
        })
        panels[0].dimRed(); // doesn't work here but works in console after...
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
    
    // console.log('got data: ' + data);
    // console.log('object: ' + i);
    // var freq = object.freq, url = object.url;
    // console.log('freq: ' + freq + ', url: '+ url);
    // $.each(object, function(j, value) {
        //     console.log(j + '=' + value);
                // })