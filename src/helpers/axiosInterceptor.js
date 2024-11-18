import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  const jwt = window.localStorage.getItem('jwt');
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }

  return config;
}, (error) =>
  // Do something with request error
  Promise.reject(error));

// Add a response interceptor
axios.interceptors.response.use((response) =>
  // Do something with response data
  Promise.resolve(response.data),
  (error) => {
    console.log(error)
    if (error.response.status == 403) {
      window.localStorage.removeItem('jwt');
      window.localStorage.removeItem('user');
    }
    // Do something with response error
    return Promise.reject(error)
  }
);

// axios.defaults.baseURL = "http://backend:8080";
// axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default axios;
