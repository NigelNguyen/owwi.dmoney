import axios from "axios";

const createAxios = axios.create({
  baseURL: "http://localhost:5001",
  timeout: 10000,
  withCredentials: true,
});

createAxios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default createAxios
