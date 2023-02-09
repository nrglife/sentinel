import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const username = process.env.REACT_APP_AUTH_USERNAME;
const password = process.env.REACT_APP_AUTH_PASSWORD;

const token = btoa(`${username}:${password}`);

export const setupInterceptors = (): void => {
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      config.headers.Authorization = `Basic ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const get = (url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> => {
  return axios.get(`${url}`, config);
};

const api = {
  get: get,
};

export default api;
