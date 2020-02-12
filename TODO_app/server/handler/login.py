'''This code handles the backed of how authentication and registration is handled.
The registration handlers takes care of the post requests and checks if an entry with the submitted username exists. If not, it creates a new entry and saves in the database. It then logs the user in by setting a header and adding the user to a logged in list(cookies are ideal which is how we might do it in the final project but there was some confusion regarding cookies with the frontend so headers are used temporarily)
The LoginHandler authenticates a user by checking the id and password, sets the header and adds the user to the logged in list. The password will not be stored in plain text in the final project but for the sake of todo, we have done it that way. We will use a hashed password for the final project.
Finally, the logout handler removes the username from the logged in list'''

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
