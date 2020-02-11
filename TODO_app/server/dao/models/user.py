# Model of "/login" API
class UserEntryModel(object):
	def __init__(self, db):
		self.db = db

	async def get_user_entry(self):
		rs = await self.db.query("SELECT * FROM user_table WHERE username=%s;", username)
		return [{"username": i[0], "password": i[1]} for i in rs]
		