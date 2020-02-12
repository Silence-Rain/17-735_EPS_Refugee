import tornado.web
import tornado.ioloop
import tornado.httpserver
from tornado.options import define, options
import routes
from config import *
from dao.db import Database
from dao.mysql import MySQL

# Server listens to port 8888
define("port", default=8888, type=int)
# Disable general CORS requests
define("TEST", default=False, type=bool)
tornado.options.parse_command_line()

# Establish connection to MySQL server
# Connection params come from config.py
db = MySQL(
		host=DB_HOST,
		user=DB_USER,
		passwd=DB_PASSWD,
		port=DB_PORT,
		db=DB_DB
	)

# List of logged-in users
login_list = []

# Additional settings
settings = {
# 	"login_url": "/login",
# 	"cookie_secret": "hahahaha"
}

# Create and configure a tornado web server
application = tornado.web.Application(
		handlers=routes.handlers,
		db=Database(db),
		login_list=login_list,
		TEST=options.TEST,
		autoreload=True,
		**settings
	)

if __name__ == '__main__':
	# Server start an async event loop and listen for requests
	application.listen(options.port)
	ioloop = tornado.ioloop.IOLoop.current()
	ioloop.start()