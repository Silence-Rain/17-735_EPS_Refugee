from .models.todo_items import TodoItemsModel

class Database(object):
	def __init__(self, db):
		self.db = db
		self.todo = TodoItemsModel(self.db)