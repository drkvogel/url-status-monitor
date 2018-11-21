
// (function () {
    'use strict';



    function StatusPanel(id, name, url, freq, parent) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.freq = freq; //?
        this.parent = parent;
        this.redOn = false;
        this.flashPeriod = 500;

        // var redLight, grnLight;

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

        function getSVG() {
            // TODO could cache...
            return document.getElementById('svg'+id);
        }

        function getSVGElement(id) {
            // TODO could cache...
            return getSVG().contentDocument.getElementById(id);
        }

        this.dimRed = function() {
            // clearInterval(that.flashInterval);
            $(getSVGElement('redLight')).css('fill', 'darkred');
            this.redOn = false;
        }
        
        this.litRed = function() {
            $(getSVGElement('redLight')).css('fill', 'red');
            this.redOn = true;
        }
        
        var that = this;
        
        this.onRedFlash = function() {
            if (that.redOn) {
                that.dimRed();
            } else {
                that.litRed();
            }
        }

        this.stopFlash = function() {
            clearInterval(that.flashInterval);
            that.flashInterval = undefined;
        }

        this.flashRed = function() {
            // console.log($(getSVGElement('redLight')).css('fill'));
            console.log('redOn: '+this.redOn);
            if (this.flashInterval === undefined) { // prevent layered flashes
                this.flashInterval = setInterval(this.onRedFlash, this.flashPeriod);
            }
        }
    
        this.dimGrn = function() {
            $(getSVGElement('grnLight')).css('fill', 'darkgreen');
        }

        this.litGrn = function() {
            $(getSVGElement('grnLight')).css('fill', 'green');
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

        function onSuccess()    { console.log("light id "+id+" onSuccess"); }
        function onComplete()   { console.log("light id "+id+" checked url: " + url); }
        function onError()      { alert("onError: url: "+url); }
        
        console.log('StatusPanel(id = ' + id + ', name='+name+', url='+this.url+', freq='+freq+')');
        this.render();
        // this.dimRed();
        // setTimeout(checkURL, freq * 100);  // just once for testing
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
        // panels[0].dimRed(); // doesn't work here but works in console after...
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
    
        // var svg = document.getElementById('svg1');
    // console.log('got data: ' + data);
    // console.log('object: ' + i);
    // var freq = object.freq, url = object.url;
    // console.log('freq: ' + freq + ', url: '+ url);
    // $.each(object, function(j, value) {
        //     console.log(j + '=' + value);
                // })

    // function onClickCreate() {
    //     console.log('Create button clicked');
    //     $('#statusContainer').append(html);
    // }   

    // function onClickRedButton() {
    //     console.log('Red button clicked');
    //     var redLight = svg.contentDocument.getElementById('redLight');
    //     $(redLight).css('fill', 'white');
    // }
    
    // function onClickGreenButton() {
    //     console.log('Green button clicked');
    //     var greenLight = svg.contentDocument.getElementById('grnLight');
    //     $(greenLight).css('fill', 'white');
    // }

    // $('#redButton').on('click', onClickRedButton);
    // $('#greenButton').on('click', onClickGreenButton);
    // $('#createStatusPanel').on('click', onClickCreate);

    // var html = '<div style="display: inline; float: left" class="statusPanel"><div class="trafficLights" style="text-align: center;">' +
    //     '<object id="svg1" type="image/svg+xml" data="img/lights.svg">Your browser doesn\'t support objects.</object>' +
    //     '</div></div>';f