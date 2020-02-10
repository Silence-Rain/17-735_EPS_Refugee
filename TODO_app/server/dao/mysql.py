import pymysql

# Wrapper of MySQL operations
class MySQL(object):
	# Constructor, initiate database connection
	def __init__(self, host, user, passwd, db, port=3306, charset='utf8mb4'):
		self.host = host
		self.user = user
		self.passwd = passwd
		self.db = db
		self.port = port
		self.charset = charset
		self.connect()

	# For SELECT statement, return one record
	async def get(self, sql):
		self.cursor.execute(sql)
		return self.cursor.fetchone()

	# For SELECT statement, return all the records
	async def query(self, sql):
		self.cursor.execute(sql)
		return self.cursor.fetchall()

	# For other SQL statements which would change the status of database (INSERT, UPDATE, DELETE, ...)
	async def execute(self, sql):
		try:
			# Try to execute the statement and commit the changes
			nr = self.cursor.execute(sql)
			self.conn.commit()
			return nr
		except Exception as e:
			# If fails, rollback the database to previous status
			self.conn.rollback()
			print(e)
			return 0

	# Initiate database connection
	def connect(self):
		# Get database connection
		self.conn = pymysql.connect(
						host = self.host, 
						port = self.port, 
						user = self.user,
						passwd = self.passwd,
						db = self.db,
						charset = self.charset
						)
		# Get database cursor
		self.cursor = self.conn.cursor()

	# Close database connection
	def close(self):
		self.cursor.close()
		self.conn.close()
