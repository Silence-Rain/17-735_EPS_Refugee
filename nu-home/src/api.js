import axios from "axios";

// Determine backend URL
let server = process.env.NODE_ENV === 'production' ? 'https://www.silence-rain.com/api' : 'http://localhost/api';

// Wrapped API object
const api = axios.create({
  baseURL: server,
  headers: {
  	'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default api;