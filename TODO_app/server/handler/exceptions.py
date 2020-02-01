from tornado.web import HTTPError


class MissingArgumentError(HTTPError):
	def __init__(self, arg_name):
		super(MissingArgumentError, self).__init__(400, 'Missing argument %s' % arg_name)
		self.arg_name = arg_name


class ArgsError(HTTPError):
	def __init__(self, res_name):
		super(ArgsError, self).__init__(400, "Arguments error: %s" % res_name)
		self.arg_name = res_name