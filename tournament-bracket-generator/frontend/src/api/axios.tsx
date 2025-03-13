import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://127.0.0.1:8000/";

export const getData = (pathname: string): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}${pathname}`);
};

export const postData = <T,>(
  pathname: string,
  data: T
): Promise<AxiosResponse> => {
  return axios.post(`${BASE_URL}${pathname}`, data);
};
