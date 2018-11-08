

remember, OO JS...

new Button()?

possible tdd test e.g. function onClickRedButton()
document.getElementById('svg1').contentDocument.getElementById('redLight').css('fill') = 'white';


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
