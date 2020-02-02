from handler.base import BaseHandler
import routes

class TodoItemsHandler(BaseHandler):

	async def get(self):
		res = await self.db.todo.get_items()
		self.finish_success(result={"res": res})

	async def post(self):
		args = self.get_argument("data")
		ts, comment = args["ts"], args["comment"]
		nr = await self.db.todo.create_item(ts, comment)

		if nr:
			self.finish_success(result={"res": "ok"})
		else:
			self.finish_err(result={"res": "err"})

	async def put(self):
		args = self.get_argument("data")
		id, ts, comment = args["id"], args["ts"], args["comment"]
		nr = await self.db.todo.update_item(id, ts, comment)

		if nr:
			self.finish_success(result={"res": "ok"})
		else:
			self.finish_err(result={"res": "err"})

	async def delete(self):
		id = self.get_argument("id")
		nr = await self.db.todo.delete_item(id)

		if nr:
			self.finish_success(result={"res": "ok"})
		else:
			self.finish_err(result={"res": "err"})


routes.handlers += [
	(r'/todo_items', TodoItemsHandler)
]