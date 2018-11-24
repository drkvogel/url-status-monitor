
// (function () { // TODO IIFE?
    'use strict';

    function StatusPanel(id, name, url, freq, parent) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.freq = freq;
        this.parent = parent;
        this.redOn = false;
        this.flashPeriod = 300;

        var self = this;

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
            $(parent).append(div);
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
            $.ajax({
                url: url,
                complete: onComplete,
                success: onSuccess,
                error: onError
            });
        }

        function onSuccess()    { 
            self.stopFlash();
            self.litGrn();
        }

        function onError()      { 
            self.dimGrn();
            self.flashRed();
        }

        function onComplete(jqXHR)   { // ajax call is finished, whether successful or not
            console.log("light id "+id+" onComplete, checked url: "+url+', status: '+jqXHR.status); //  jqXHR: '+JSON.stringify(jqXHR));
            $(self.statusDiv).text('Status: ' + jqXHR.status);
        }
        
        console.log('StatusPanel(id = '+id+', name='+name+', url='+this.url+', freq='+freq+')');
        this.render();
        // setTimeout(checkURL, freq * 100);  // just once for testing
        setInterval(checkURL, freq * 1000);
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
