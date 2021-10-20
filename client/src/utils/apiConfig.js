import axios from "axios";
import { AUTH, getLocalStorageValue , removeRelatedWithAuth } from "./useAuth";

const instance = axios.create({ timeout: -1 });

instance.interceptors.request.use((config) => {
    if(getLocalStorageValue(AUTH).token !== "" && getLocalStorageValue(AUTH).token !== undefined && getLocalStorageValue(AUTH).token !== null ){
        const token = getLocalStorageValue(AUTH).token;
        config.headers.authorization = `Bearer ${token}`;
    }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  function (error) {
    if (error.response.status === 401) {
      removeRelatedWithAuth();
      alert({ message: "Sesi anda telah berakhir, silahkan masuk kembali.", type: "error" });
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    }
    return Promise.reject(error);
  }
);

export default instance;
