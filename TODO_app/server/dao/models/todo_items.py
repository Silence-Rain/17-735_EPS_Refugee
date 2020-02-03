# Model of "/todo_items" API
class TodoItemsModel(object):
	def __init__(self, db):
		self.db = db

	# Return parsed result set of SELECT query
	async def get_items(self):
		rs = await self.db.query("SELECT * FROM todo_items;")
		return [{"id": i[0], "ts": i[1], "comment": i[2]} for i in rs]

	# Return number of affected rows of INSERT query
	async def create_item(self, ts, comment):
		nr = await self.db.execute("INSERT INTO todo_items (`ts`, `comment`) VALUES (%s, '%s');" % (ts, comment))
		return nr

	# Return number of affected rows of UPDATE query
	async def update_item(self, id, ts, comment):
		nr = await self.db.execute("UPDATE todo_items SET ts=%s, comment='%s' WHERE id=%s;" % (ts, comment, id))
		return nr

	# Return number of affected rows of DELETE query
	async def delete_item(self, id):
		nr = await self.db.execute("DELETE FROM todo_items WHERE id=%s;" % id)
		return nr
		