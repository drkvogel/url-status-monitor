

# Notes

## todo


venv?
grok flask static folder
nginx serve static?
dockerize

grok status spec

### Server status widget

* The green light is dimmed and the red light is illuminated and set flashing if the HTTP status code has been something else than 200 at least 3 times during the past two minutes
* The green light is illuminated and the red light is dimmed if the HTTP status code has been something else than 200 at most once during the past two minutes

in the past two minutes:
    n <= 1: green lit, red dim
    n == 2: ?
    n >= 3: green dim, red flashing

what about when the status has been not 200 twice in the last two minutes?
    error in spec must be part of the test...




## defer

getJSON().fail never called?
    promises?

make Flask server production-ready (debug off, ...?)

hmmm... is escaping those quotes going to cause a problem for jinja? do they need to be escaped?
```html
<script>window.jQuery || document.write('<script src="{{ url_for(\'static\', filename=\'js/vendor/jquery-3.3.1.min.js\') }}"><\/script>')</script>
```

### IIFE

do we need? hides vars from debugger

### Firefox layout bug

raise a bug in Firefox:
Dynamically generated elements (with embedded SVG?) floated left do not render.
Firefox 63.0.1 (64-bit)
Works on Google Chrome Version 70.0.3538.77 (Official Build) (64-bit)
Firefox layout bug on div append - JSFiddle (https://jsfiddle.net/chrisjbird/xpvt214o/935503/) (but can't reproduce)

use flexbox?


### TDD

possible tdd test

```js
if (document.getElementById('svg1').contentDocument.getElementById('redLight').css('fill') === 'red') {
    // test passed
)  
```

...

### Jinja

see [jinja.md]

### fake news

What is fake news and can you identify it? - BBC News (https://www.bbc.co.uk/news/av/technology-46149888/what-is-fake-news-and-how-can-you-identify-it)
Fake News - BBC News (https://www.bbc.co.uk/news/topics/cjxv13v27dyt/fake-news)
Steam bug allowed unlimited free downloads - BBC News (https://www.bbc.co.uk/news/technology-46183000)
A year in fake news in Africa - BBC News (https://www.bbc.co.uk/news/world-africa-46127868)
The digital epidemic killing Indians - BBC News (https://www.bbc.co.uk/news/av/stories-46152427/the-digital-epidemic-killing-indians)
Russian disinformation and the 'lab of death' - BBC News (https://www.bbc.co.uk/news/av/world-46157507/russian-disinformation-and-the-georgian-lab-of-death)
Burned to death because of a rumour on WhatsApp - BBC News (https://www.bbc.co.uk/news/world-latin-america-46145986)



## done

link table to map lights to configs
remember, OO JS...
new Button()?
>The constructor function is JavaScript's version of a class
new TrafficLight(url, id?)
need status pattern at /status to test, e.g. /status?pattern=1
check urls

story:
got to [server]/configs?id=n
select config id n from db
join configs, link table, lights to get list of lights
for each light
    get the name and url
generate a page (from a template) that has a div for each light
creates a page with multiple lights from ids
    how?
the lights start checking

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
