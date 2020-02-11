from .models.todo_items import TodoItemsModel
from .models.user import UserEntryModel

# Aggregation of models
# This object will be injected into Tornado web application (in app.py), 
# and will act as a bridge when handler class is trying to call its own model
class Database(object):
	def __init__(self, db):
		self.db = db
		self.todo = TodoItemsModel(self.db)
		self.user =UserEntryModel(self.db)