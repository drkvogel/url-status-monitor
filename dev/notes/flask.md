
# Flask server


```
$ pip install Flask
$ FLASK_APP=hello.py flask run
 * Running on http://localhost:5000/
```

Alternatively you can use python -m flask:

```
$ export FLASK_APP=hello.py
$ python -m flask run
 * Running on http://127.0.0.1:5000/
```

>This launches a very simple builtin server, which is good enough for testing but probably not what you want to use in production. For deployment options see Deployment Options.

```
[ 11:44am ]  [ kvogel@kvogel-macbook-2018:~/Projects/newsnow-test/server(master✗) ]
 $ python server.py
 * Serving Flask app "server" (lazy loading)
 * Environment: production
   WARNING: Do not use the development server in a production environment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 ```


flask.cli.NoAppException

flask.cli.NoAppException: Failed to find Flask application or factory in module "server". Use "FLASK_APP=server:name to specify one.

flask.cli.NoAppException: module 'server' has no attribute 'app'

