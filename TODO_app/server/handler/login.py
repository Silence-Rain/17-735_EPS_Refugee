from handler.base import BaseHandler
import routes

# Handler of "/todo_items" API
class LoginHandler(BaseHandler):

	# Handle POST request
	async def post(self):
		# Parse arguments
		#TODO: set_secure_cookie
		username = self.get_argument("username")
		password = self.get_argument("password")
		user = self.application.syncdb['user_table'].find_one({'username': username})

		if user and user['password'] == password:
			self.set_cookie("username", tornado.escape.json_encode(username))
			self.finish_success(result={"res": "ok"})
        else:
            self.redirect(u"/login")
			self.finish_err(500, result={"res": "err"})


class RegisterHandler(BaseHandler):

	# Handle POST request
	def post(self):
        username = self.get_argument("username")
		password = self.get_argument("password")

        already_taken = self.application.syncdb['user_table'].find_one({'username': username})
        if already_taken:
			self.finish_err(500, result={"res": "err"})

        user = {}
        user['username'] = username
        user['password'] = password

        auth = self.application.syncdb['user_table'].save(user)
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