from handler.base import BaseHandler
import routes
import tornado

# Handler of "/todo_items" API
class TodoItemsHandler(BaseHandler):
	@tornado.web.authenticated
	# Handle GET request (Read records)
	async def get(self):
		# Parse arguments
		username = self.get_argument("username")

		# Return all records from database
		res = await self.db.todo.get_items(username)
		self.finish_success(result={"res": res})

	# Handle POST request (Create records)
	async def post(self):
		# Parse arguments
		args = self.get_argument("data")
		ts, comment, username = args["ts"], args["comment"], args["username"]
		
		# Create a new record based on given arguments
		nr = await self.db.todo.create_item(ts, comment, username)
		if nr:
			# Success if the number of affected row is not 0
			self.finish_success(result={"res": "ok"})
		else:
			self.finish_err(500, result={"res": "err"})

	# Handle PUT request (Update records)
	async def put(self):
		# Parse arguments
		args = self.get_argument("data")
		id, ts, comment = args["id"], args["ts"], args["comment"]

		# Update corresponding record based on given arguments
		nr = await self.db.todo.update_item(id, ts, comment)
		if nr:
			# Success if the number of affected row is not 0
			self.finish_success(result={"res": "ok"})
		else:
			self.finish_err(500, result={"res": "err"})

	# Handle DELETE request (Delete records)
	async def delete(self):
		# Parse arguments
		id = self.get_argument("id")
		
		# Delete corresponding record based on given arguments
		nr = await self.db.todo.delete_item(id)
		if nr:
			# Success if the number of affected row is not 0
			self.finish_success(result={"res": "ok"})
		else:
			self.finish_err(500, result={"res": "err"})


# Add handler to router
routes.handlers += [
	(r'/todo_items', TodoItemsHandler)
]