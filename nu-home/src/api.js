import axios from "axios";

const api = () => {
	return axios.create({
	  baseURL: 'http://localhost:8000/',
	  headers: {
	  	'Content-Type': 'application/json',
	  },
	  withCredentials: true,
	})
};

export default api;