import pymysql

class MySQL(object):
	def __init__(self, host, user, passwd, db, port=3306, charset='utf8'):
		self.host = host
		self.user = user
		self.passwd = passwd
		self.db = db
		self.port = port
		self.charset = charset
		self.connect()

	async def get(self, sql):
		self.cursor.execute(sql)
		return self.cursor.fetchone()

	async def query(self, sql):
		self.cursor.execute(sql)
		return self.cursor.fetchall()

	async def execute(self, sql):
		try:
			nr = self.cursor.execute(sql)
			self.conn.commit()
			return nr
		except Exception as e:
			self.conn.rollback()
			print(e)
			return 0

	def connect(self):
		self.conn = pymysql.connect(
						host = self.host, 
						port = self.port, 
						user = self.user,
						passwd = self.passwd,
						db = self.db,
						charset = self.charset
						)
		self.cursor = self.conn.cursor()

	def close(self):
		self.cursor.close()
		self.conn.close()
