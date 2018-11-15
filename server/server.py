from flask import Flask, render_template, g, request, jsonify
import sqlite3

# set templates folder here
app = Flask(__name__, template_folder='templates')
DB = './config.db'

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

@app.route("/test")
def test():
    return render_template('test.html')

    # config = query_db("SELECT * FROM configs WHERE id = ?", [1], one=True)
    # if config is None:
    #     msg = "Config not found"
    #     raise msg	# ??
    # else:
    #     msg =  "<p>Config: id: %s, name: %s</p>\n" % (config["id"], config["name"])

def get_lights(config_id):
    query = (
        "SELECT c.id AS config_id, c.name AS config_name,"
        " l.id AS light_id, l.name AS light_name, l.url AS light_url"
        " FROM configs c, configs_lights cl, lights l"
        " WHERE c.id = cl.id_config AND l.id = cl.id_light"
		" AND c.id = ?"
    )
    lights = query_db(query, [config_id])
    return lights

@app.route("/getconfig")
def get_config():
    config_id = request.args.get('id')
    lights = get_lights(config_id)
    data = [] # https://stackoverflow.com/questions/34715593/rows-returned-by-pyodbc-are-not-json-serializable
    for row in lights:
        # data.append([x for x in row]) 
        data.append(list(row))
    return jsonify(data)	

@app.route("/showconfig")
def show_config():
    config_id = request.args.get('id')
    lights = get_lights(config_id)
    if lights == []:
        msg = 'Error: no lights found for config_id: ' + str(config_id)
    else:
        #msg =  "<p>Config: id: %s, name: %s</p>\n" % (config["id"], config["name"])
        msg =  "<p>Config: id: %s\n" % (config_id)
    table = '<table><tr><th>id</th><th>name</th><th>url</th><tr>'
    for light in lights:
        table += "<tr><td>%s</td><td>%s</td><td>%s</td></tr>" % (light['light_id'], light['light_name'], light['light_url'])
    table += '</table>\n'
    return render_template('config.html', msg=msg, config_id=config_id, lights=table)

@app.route("/status")
def status():
    return render_template('status.html')

if __name__ == '__main__':
    app.run(debug=True)
