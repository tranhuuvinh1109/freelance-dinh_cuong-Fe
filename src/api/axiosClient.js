import axios from 'axios';
const axiosClient = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/',
  baseURL: 'https://mange-zdqk.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosClient.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem('TRAVALID_TOKEN');
//     config.headers.token = 'Bearer ' + token;
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );

// axiosClient.interceptors.response.use(
//   function (response) {
//     return response.data;
//   },
//   function (error) {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('TRAVALID_TOKEN');
//     }

//     return Promise.reject(error);
//   },
// );
export default axiosClient;
