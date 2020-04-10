import axios from "axios";

let server = process.env.NODE_ENV === 'production' ? 'http://www.silence-rain.com/api' : 'http://localhost/api';

const api = axios.create({
  baseURL: server,
  headers: {
  	'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default api;