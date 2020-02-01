import tornado.web
import tornado.ioloop
import tornado.httpserver
from tornado.options import define, options
import routes
from config import *
from dao.db import Database
from dao.mysql import MySQL

define("port", default=8888, type=int)
define("TEST", default=False, type=bool)
tornado.options.parse_command_line()

db = MySQL(
		host=DB_HOST,
		user=DB_USER,
		passwd=DB_PASSWD,
		port=DB_PORT,
		db=DB_DB
	)

application = tornado.web.Application(
		handlers=routes.handlers,
		db=Database(db),
		TEST=options.TEST,
		autoreload=True,
	)

if __name__ == '__main__':
	application.listen(options.port)
	ioloop = tornado.ioloop.IOLoop.current()
	ioloop.start()