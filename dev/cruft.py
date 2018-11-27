
# cruft

# msg += "Python version: " + sys.version	# Python version: 3.6.5 [...]

# from urllib import request
# import sys

# reference query fields with names
# def make_dicts(cursor, row):
#     return dict((cursor.description[idx][0], value) for idx, value in enumerate(row))
# db.row_factory = make_dicts	# allows e.g. table_name["field_name"]
# or:
# db.row_factory = sqlite3.Row	# also allows table_name["field_name"]
    # uses Row objects rather than dicts to return the results of queries. These are `namedtuple`s, 
    # so we can access them either by index or by key

# cur = get_db().cursor()

# query_string = request.query_string

# data.append([x for x in row]) 
# data.append(list(row))

# config = query_db("SELECT * FROM configs WHERE id = ?", [1], one=True)
# if config is None:
#     msg = "Config not found"
#     raise msg	# ??
# else:
#     msg =  "<p>Config: id: %s, name: %s</p>\n" % (config["id"], config["name"])