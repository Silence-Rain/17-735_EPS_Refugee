from handler.base import BaseHandler
import routes
import tornado

# Handler of "/login" API
class LoginHandler(BaseHandler):

	# Handle POST request
	async def post(self):
		# Parse arguments
		args = self.get_argument("data")
		username, password = args["username"], args["password"]

		# Validate the combination of username and password
		user = await self.db.user.get_user_entry(username)
		if user and user[0]['password'] == password:
			# If success, add header and update logged-in users list
			self.set_header("Username", username)
			if username not in self.login_list:
				self.login_list.append(username)
			self.finish_success(result={"res": "ok"})
		else:
			self.finish_err(403, result={"res": "err"})

# Handler of "/register" API
class RegisterHandler(BaseHandler):

	# Handle POST request
	async def post(self):
		# Parse arguments
		args = self.get_argument("data")
		username, password = args["username"], args["password"]

		# If user already exists
		user = await self.db.user.get_user_entry(username)
		if user:
			self.finish_err(500, result={"res": "err"})

		# Create a new user
		rs = await self.db.user.save_user_entry(username, password)
		if rs:
			# If success, keep the user logged-in
			self.set_header("Username", username)
			if username not in self.login_list:
				self.login_list.append(username)
			self.finish_success(result={"res": "ok"})
		else:
			self.finish_err(500, result={"res": "err"})

# Handler of "/logout" API
class LogoutHandler(BaseHandler):

	# Handle POST request
	async def post(self):
		# Parse arguments
		args = self.get_argument("data")
		username = args["username"]

		# Remove logged-out user from list
		if username in self.login_list:
			self.login_list.remove(username)

		self.finish_success(result={"res": "ok"})


# Add handlers to router
routes.handlers += [
	(r'/login', LoginHandler),
	(r'/register', RegisterHandler),
	(r'/logout', LogoutHandler)
]
