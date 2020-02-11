from handler.base import BaseHandler
import routes
import tornado

# Handler of "/todo_items" API
class LoginHandler(BaseHandler):

	# Handle POST request
	async def post(self):
		# Parse arguments
		#TODO: set_secure_cookie
		username = self.get_argument("username")
		password = self.get_argument("password")
		user = await self.db.user.get_user_entry(username)

		if user and user[0]['password'] == password:
			self.set_cookie("username", tornado.escape.json_encode(username))
			self.finish_success(result={"res": "ok"})
		else:
			self.redirect(u"/login")
			self.finish_err(500, result={"res": "err"})


class RegisterHandler(BaseHandler):

	# Handle POST request
	async def post(self):
		username = self.get_argument("username")
		password = self.get_argument("password")

		user = await self.db.user.get_user_entry(username)
		if user:
			self.finish_err(500, result={"res": "err"})

		user = {}
		user['username'] = username
		user['password'] = password

		self.db.user.save_user_entry(username, password)
		self.set_cookie("username", tornado.escape.json_encode(username))
		self.finish_success(result={"res": "ok"})

# Handler of "/todo_items" API
class LogoutHandler(BaseHandler):

	# Handle POST request
	async def post(self):
		self.clear_cookie("username")
		self.finish_success(result={"res": "ok"})


# Add handler to router
routes.handlers += [
	(r'/login', LoginHandler),
	(r'/register', RegisterHandler),
	(r'/logout', LogoutHandler)
]