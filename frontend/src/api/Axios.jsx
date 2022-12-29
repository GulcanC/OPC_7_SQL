import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
// import ReactContext
import { ReactContext } from "../reactContext/ReactContext";
//import Token modal component
import TokenModal from "../components/TokenModal";

const getBaseUrl = () => {
  return process.env.GC_APP_BASE_URL
    ? process.env.GC_APP_BASE_URL
    : "http://localhost:5000/api";
};

const customAxios = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
});

const AxiosInterceptor = () => {
  const [isTokenExpired, setTokenExpired] = useState(false);
  // in ReactContext componenet we already cretated logout function
  const { logout } = useContext(ReactContext);

  useEffect(() => {
    // if the response is ok,
    const resInterceptor = (response) => {
      return response;
    };
    // if the response is error
    const errInterceptor = (error) => {
      if (
        error.response.status === 401 &&
        !(
          error.response.request.responseURL ===
            "http://localhost:5000/api/auth/login" ||
          error.response.request.responseURL ===
            `${process.env.GC_APP_BASE_URL}/auth/login`
        )
      ) {
        setTokenExpired(true);
        logout();
      }
      throw error;
    };
    // there are two types of interceptors, response and request
    // add a response interceptor
    const interceptor = customAxios.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );
    // if you want to remove an interceptor
    return () => customAxios.interceptors.response.eject(interceptor);
  }, [logout]);

  return isTokenExpired && <TokenModal setTokenExpired={setTokenExpired} />;
};

export default customAxios;
export { AxiosInterceptor };
