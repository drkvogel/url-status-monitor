
# todo

make Flask server production-ready (debug off, ...?)

remember, OO JS...
new Button()?
>The constructor function is JavaScript's version of a class.

## defer

possible tdd test

```js
if (document.getElementById('svg1').contentDocument.getElementById('redLight').css('fill') === 'red') {
    // test passed
)  
```


### Firefox layout bug

raise a bug in Firefox:
Dynamically generated elements floated left do not render.
Firefox 63.0.1 (64-bit)
Works on Google Chrome Version 70.0.3538.77 (Official Build) (64-bit)
Firefox layout bug on div append - JSFiddle (https://jsfiddle.net/chrisjbird/xpvt214o/935503/) (but can't reproduce)


use flexbox?\

### IIFE

do we need? hides vars from debugger



# NewsNow Full-stack Developer Exercise

All code you send us should be entirely your own, and should be of the quality you would expect to submit for a real NewsNow project.

## Server status widget

Create pages containing multiple traffic light widgets that use the browser to monitor individual URLs. In the frontend, use object-oriented JavaScript, HTML, CSS (and preferable jQuery) to create traffic light objects with the following properties:

* The object renders a traffic light on the web page, like the ones shown above
* Every 10 seconds or so the object checks a URL (e.g. "/status") and retrieves the HTTP status code of the response
* The green light is dimmed and the red light is illuminated and set flashing if the HTTP status code has been something else than 200 at least 3 times during the past two minutes
* The green light is illuminated and the red light is dimmed if the HTTP status code has been something else than 200 at most once during the past two minutes
* One can place multiple objects on the same web page monitoring different URLs.

new TrafficLight(url, id?)

In the backend, use any suitable language to create two endpoints:

1. A server or script, with which to test the traffic lights, that accepts a specified HTTPresponse status code as a query string parameter and returns the specified HTTPresponse status code header as output.

2. A server or script that generates a web page containing multiple ‘traffic lights’ according to a choice of configurations stored in MySQL or SQLite table(s), and a query string parameter that selects a particular configuration of traffic lights to display.

configuration
url

* For a particular query string parameter, the selected configuration specifiesthe traffic lights displayed on the returned web page
* A configuration can specify one or more predefined ‘traffic lights’ to be displayed, while a predefined ‘traffic light’ may be referenced in multiple configurations
* A ‘traffic light’ is defined by the URL to be monitored and the frequency with which it should be checked. Please provide table definition SQL for your solution

story:
got to [server]/configs?id=n
select config id n from db
splits config text to get ids of lights
for each id
    check it exists in the lights table, raise an error if not
    get the name and url from the lights table
generate a page (from a template) that has a div for each light
creates a page with multiple lights from ids
    how?
the lights start checking


## done

### scaffolding

#### yeoman

yo pwa worked for ocpcares
yo h5package fails
yo webapp fails
    $ is not defined - where is jquery?
    where is bootstrap
    == generator-webapp? is the one I used for bbquizzes?
    where is jQuery? where is Bootstrap? nothing seems to work...
yo static-webapp fails...

#### html5boilerplate

no hot reload
use serve/pyserve to serve locally
or node `http-server`

### SVG Editors

#### Inkscape

Does the job, but puts loads of Inkscape-specific ("sodipodi"?) stuff in there
look at (e.g.) /Users/kvogel/Projects/bb-quizzes/trails/yo/app/images/part-a.svg for an example of a cleaner SVG

#### VS Code SVG Editor extension

...

### serving front end

pyserve

### node http-server

```
[ 12:15pm ]  [ kvogel@kvogel-macbook-2018:~/Projects ]
 $ npm i -g http-server
/usr/local/bin/hs -> /usr/local/lib/node_modules/http-server/bin/http-server
/usr/local/bin/http-server -> /usr/local/lib/node_modules/http-server/bin/http-server
+ http-server@0.11.1
[  3:52pm ]  [ kvogel@kvogel-macbook-2018:~/Projects ]
 $ http-server
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.0.6:8080
Hit CTRL-C to stop the server
^Chttp-server stopped.
[  3:52pm ]  [ kvogel@kvogel-macbook-2018:~/Projects ]
 $ which http-server
/usr/local/bin/http-server
```
