import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const setupInterceptors = (): void => {
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      config.headers.Authorization = process.env.REACT_APP_AUTH_CREDENTIALS;
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
