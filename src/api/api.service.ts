import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const setupInterceptors = (): void => {
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      config.headers.Authorization = "Basic YWxldmluem9uOkFsZG8xOTgw";
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
