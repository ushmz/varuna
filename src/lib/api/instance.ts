import axios from "axios";
import humps from "humps";

const instance = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3333/api",
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
  (error) => error,
);

instance.interceptors.response.use(
  (response) => {
    response.data = humps.camelizeKeys(response.data);
    return response;
  },
  (error) => error,
);

export default instance;
