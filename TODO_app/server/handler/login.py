from handler.base import BaseHandler
import routes
import tornado

# Handler of "/todo_items" API
class LoginHandler(BaseHandler):

	async def get(self):
		self.write('<html><body><form action="/login" method="post">'
                   'Username: <input type="text" name="username">'
                   'Password: <input type="text" name="password">'
                   '<input type="submit" value="Sign in">'
                   '</form></body></html>')

	# Handle POST request
	async def post(self):
		# Parse arguments
		username = self.get_body_argument("username") 
		password = self.get_body_argument("password")
		user = await self.db.user.get_user_entry(username)

		if user and user[0]['password'] == password:
			self.set_cookie("username", username)#tornado.escape.json_encode(username))
			self.finish_success(result={"res": "ok"})
			#self.redirect(self.get_query_argument('next', '/todo_items'))
		else:
			self.redirect(u"/login")
			self.finish_err(500, result={"res": "err"})


class RegisterHandler(BaseHandler):

	# Handle POST request
	async def post(self):
		args = self.get_argument("data")
		username, password = args["username"], args["password"]

		user = await self.db.user.get_user_entry(username)
		if user:
			self.finish_err(500, result={"res": "err"})

		user = {}
		user['username'] = username
		user['password'] = password

		rs = await self.db.user.save_user_entry(username, password)
		if rs:
			self.set_cookie("username", username)#tornado.escape.json_encode(username))
			self.finish_success(result={"res": "ok"})
		else:
			self.finish_err(500, result={"res": "err"})

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
