
// (function () { // TODO IIFE?
    'use strict';

    function StatusPanel(id, name, url, freq, parent) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.freq = freq; //?
        this.parent = parent;
        this.redOn = false;
        this.flashPeriod = 300;

        var self = this;

        // var redLight, grnLight;

        this.render = function() {
            var div = document.createElement('div'),
                p1 = document.createElement('p'),
                text1 = document.createTextNode(name),
                p2 = document.createElement('p'),
                text2 = document.createTextNode(url),
                p3 = document.createElement('p'),
                text3 = document.createTextNode('id: '+id),
                statusPara = document.createElement('p'),
                statusText = document.createTextNode('Status: Unknown'),
                object = document.createElement('object');
            div.setAttribute('class', 'statusPanel');
            div.setAttribute('id', 'statusPanel'+id);
            object.setAttribute('id', 'svg'+id);
            object.setAttribute('type', 'image/svg+xml');
            object.setAttribute('data', '/static/img/lights.svg');
            div.appendChild(object);
            p1.appendChild(text1)
            div.appendChild(p1);
            p2.appendChild(text2)
            div.appendChild(p2);
            p3.appendChild(text3);
            div.appendChild(p3);
            this.statusDiv = statusPara;
            statusPara.appendChild(statusText);
            div.appendChild(statusPara);
            this.div = $(parent).append(div);
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
            $(getSVGElement('redLight')).css('fill', 'darkred');
            this.redOn = false;
        }
        
        this.litRed = function() {
            $(getSVGElement('redLight')).css('fill', 'red');
            this.redOn = true;
        }
        
        this.onRedFlash = function() {
            if (self.redOn) {
                self.dimRed();
            } else {
                self.litRed();
            }
        }

        this.stopFlash = function() {
            clearInterval(self.flashInterval);
            self.flashInterval = undefined;
            self.dimRed();
        }

        this.flashRed = function() {
            if (this.flashInterval === undefined) { // prevent layered flashes
                this.flashInterval = setInterval(this.onRedFlash, this.flashPeriod);
            }
        }
    
        this.dimGrn = function() {
            $(getSVGElement('grnLight')).css('fill', 'darkgreen');
        }

        this.litGrn = function() {
            $(getSVGElement('grnLight')).css('fill', 'lightgreen');
        }
    
        function checkURL() {
            console.log('light id ' + id + ': checkUrl(): ' + url);
            $.ajax({
                url: url,
                complete: onComplete,
                success: onSuccess,
                error: onError
                // statusCode: {
                //     200: function() {
                //         self.litGrn();
                //     },
                //     404: function() {
                //         self.flashRed();
                //     }
                // }
            });
        }

        function onSuccess()    { 
            console.log("light id "+id+" onSuccess");
            self.stopFlash();
            self.litGrn();
        }
        function onError()      { 
            console.log("light id "+id+" onError: url: "+url);
            self.dimGrn();
            self.flashRed();
        }
        function onComplete(jqXHR)   { // ajax call is finished, whether successful or not
            console.log("light id "+id+" onComplete, checked url: " + url+', status: '+jqXHR.status); //  jqXHR: '+JSON.stringify(jqXHR));
            // $(parent)
            console.log('statusDiv: ' + JSON.stringify(self.statusDiv));
            $(self.statusDiv).text('Status: ' + jqXHR.status);
            
        }
        
        console.log('StatusPanel(id = ' + id + ', name='+name+', url='+this.url+', freq='+freq+')');
        this.render();
        // console.log('div: ' + JSON.stringify(this.div)); 
        setTimeout(checkURL, freq * 100);  // just once for testing
        var interval = freq * 1000;
        console.log(this.name + ': setInterval: ' + interval);
        // setInterval(checkURL, interval);
    }

    var panels = [];

    $().ready(function () { 
        var containerDiv = '#statusContainer';
        var url = "/getconfig?id=" + $(containerDiv).attr('data-id');
        $.getJSON(url, function(data) {
            $.each(data, function(i, light) {
                if (light.freq < 5) light.freq = 5; // guard against rapid checking if freq not set in db
                panels[i] = new StatusPanel(light.id, light.name, light.url, light.freq, containerDiv);
            })
        }).fail(function (jqxhr, textStatus, errorThrown) { // doesn't work?
            var err = 'error getting json: ' + textStatus + ', errorThrown: ' + errorThrown;
            console.log(err);
        });
    });

// debugger;
// }());

console.log('main.js ready');

// cruft

    // console.log('$(containerDiv).attr(\'data-id\'): ' + $(containerDiv).attr('data-id'));
    
    // var LOCAL = false;
    // var loc = location.toString().split('://')[1]; // strip off http://, https://
    // if (loc.substr(0, 9) === 'localhost') { // served locally
    //     LOCAL = true;
    // }
    // console.log('LOCAL: ' + LOCAL);

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

    // StatusPanel.prototype = {
    //     dimRed: function() {
    //         $(redLight).css('fill', 'white');
    //     }
    // }
    
    // function onClickInstantiate() {
    //     console.log('Instantiate button clicked');
    //     var panel = new StatusPanel(1, "Test", "http://localhost:8080/status", 10, '#statusContainer');
    // }

    // $('#instantiateStatusPanel').on('click', onClickInstantiate);

    //$(document).ready(
        // console.log('Document ready');