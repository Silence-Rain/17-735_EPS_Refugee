from tornado.web import RequestHandler
from handler.exceptions import *
import json

DEFAULT_TYPE = []

class BaseHandler(RequestHandler):

	# Injected Database object
	@property
	def db(self):
		return self.settings["db"]

	# JSON parser
	@property
	def json_body(self):
		if not hasattr(self, '_json_body'):
			if hasattr(self.request, "body"):
				try:
					if not self.request.body:
						self._json_body = {}
					else:
						self._json_body = json.loads(self.request.body.decode('utf-8'))
				except ValueError:
					raise ArgsError("Arguments don't have valid JSON format")
		return self._json_body

	# Set default header
	def set_default_headers(self):
		# Allow CORS requests from ALL domains
		self.set_header("Access-Control-Allow-Origin", "http://localhost:3000")
		self.set_header("Access-Control-Allow-Headers", "Content-Type")
		self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
		self.set_header("Access-Control-Allow-Credentials", "true")

	# Handler of successful response
	def finish_success(self, **kwargs):
		rs = {
			"status": "success",
			"result": list(kwargs.values())[0]
		}
		self.finish(json.dumps(rs))

	# Handler of erroneous response
	def finish_err(self, err_code, **kwargs):
		# Set corresponding error code
		self.set_status(err_code)
		rs = {
			"status": "err",
			"result": list(kwargs.values())[0]
		}
		self.finish(json.dumps(rs))

	# Default handler for OPTIONS requests, enable CORS pre-flight
	def options(self):
		self.set_status(204)
		self.finish()

	# Argument parser
	def get_argument(self, name, default=DEFAULT_TYPE, strip=True):
		if self.json_body:
			if name in self.json_body:
				rs = self.json_body[name]
				return rs
			elif default is DEFAULT_TYPE:
				raise MissingArgumentError(name)
			else:
				return default
		else:
			return super(BaseHandler, self).get_argument(name, default, strip)

			