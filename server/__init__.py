
from flask import Flask, render_template, g, request, jsonify, abort
from werkzeug import exceptions
from datetime import timedelta, datetime
import sqlite3

app = Flask(__name__, template_folder='templates', static_folder='static') # set templates folder here
DB = './server/config.db' # needs './server/' when run from run script in parent folder, why?

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DB)
    db.row_factory = sqlite3.Row
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
    return render_template('index.html')

def get_lights(config_id):
    query = (
        "SELECT c.id AS config_id, c.name AS config_name,"
        " l.id AS light_id, l.name AS light_name, l.url AS light_url, l.freq AS light_freq"
        " FROM configs c, configs_lights cl, lights l"
        " WHERE c.id = cl.id_config AND l.id = cl.id_light"
		" AND c.id = ?"
    )
    lights = query_db(query, [config_id]) # returns list of Row objects
    return lights

@app.route('/getconfig')
def get_config():
    config_id = request.args.get('id')
    lights = get_lights(config_id)
    data = [] # https://stackoverflow.com/questions/34715593/rows-returned-by-pyodbc-are-not-json-serializable
    for row in lights: # build list of dicts for JSON
        light = {}
        light['id']     = row['light_id']
        light['name']   = row['light_name']
        light['url']    = row['light_url']
        light['freq']   = row['light_freq']
        data.append(light)
    return jsonify(data)	

@app.route('/showconfig')
def show_config():
    config_id = request.args.get('id')
    lights = get_lights(config_id)
    if lights == []:
        msg = 'Error: no lights found for config_id: ' + str(config_id)
    else:
        msg = '<p>Config: id: %s\n' % (config_id)
    table = '<table><tr><th>id</th><th>name</th><th>url</th><tr>'
    for light in lights:
        table += '<tr><td>%s</td><td>%s</td><td>%s</td></tr>' % (light['light_id'], light['light_name'], light['light_url'])
    table += '</table>\n'
    return render_template('config.html', msg=msg, config_id=config_id, lights=table)


@app.route("/dashboard")
def dashboard():
    data_id = request.args.get('id')
    return render_template("dashboard.html", data_id=data_id)

@app.route("/status")
def status():
    arg = request.args.get('code')

    if arg == None:
        return render_template("status-none.html")

    code = int(arg)

    if code == 200:
        return render_template("status-200.html")

    try:
        abort(code)             # abort() will raise an error but we don't want to catch it unless it's a LookupError
    except LookupError:         # many status codes are not recognised by Flask: http://werkzeug.pocoo.org/docs/0.14/exceptions/#error-classes
        # return "status %s not recognised" % code	# but this returns a 200       
        abort(exceptions.BadRequest('status %s not handled' % code))

@app.route("/test")
def test():
    # return 'test'
    # pass # crashes flask
    # abort(403)
    # abort(Response('Hello World'))
    # return str(datetime.now())
    return render_template('test.html')

if __name__ == '__main__':
    app.run(debug=True)

