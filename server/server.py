from flask import Flask, render_template, g
from urllib import request
import sqlite3
import sys

app = Flask(__name__)

DB = './config.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DB)

    def make_dicts(cursor, row):
        return dict((cursor.description[idx][0], value) for idx, value in enumerate(row))

    db.row_factory = make_dicts	# allows e.g. config["name"]
    # db.row_factory = sqlite3.Row	# also allows config["name"]
        # uses Row objects rather than dicts to return the results of queries. These are `namedtuple`s, 
        # so we can access them either by index or by key
    return db

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv	# ?

@app.teardown_appcontext
def close_connection(e):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route("/")
def index():
    # msg = "Hello, World from index"
    # html = "<html><head><title>Route: &#47;</title></head><body><p>string: %s</p></body></html>" % msg
    # return html

    # templates dir is hardcoded?
    return render_template('index.html')

@app.route("/config")
def config():
    # cur = get_db().cursor()
    config = query_db("SELECT * FROM configs WHERE id = ?", [1], one=True)
    if config is None:
        msg = "Config not found"
    else:
        msg = "Config: name: %s, config: %s" % (config["name"], config["config"])
    # msg += "Python version: " + sys.version	# Python version: 3.6.5 [...]
    html = "<html><head><title>Route: &#47;</title></head><body><p>string: %s</p></body></html>" % msg
    return html

@app.route("/status")
def status():
    return render_template('status.html')

if __name__ == '__main__':
    app.run(debug=True)
