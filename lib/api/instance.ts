import axios from "axios";
import humps from "humps";

type Attribute = {
  name: string;
  value: string;
  color: string;
};

export type SearchPage = {
  id: number;
  title: string;
  url: string;
  snippet: string;
  attributes: Attribute[];
};

export type UserInfo = {
  id: number;
  externalID: string;
  token: string;
};

const instance = axios.create({
  baseURL: process.env.API_URL,
});

instance.interceptors.request.use(
  (config) => {
    if (config.data && config.data instanceof FormData) {
      return config;
    }
    config.params = config.params && humps.decamelizeKeys(config.params);
    config.data = config.data && humps.decamelizeKeys(config.data);
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => {
    response.data = humps.camelizeKeys(response.data);
    return response;
  },
  (error) => Promise.reject(error),
);

export default instance;
