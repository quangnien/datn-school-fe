import axios from "axios";

export const API = axios.create({ baseURL: "http://localhost:8080/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).retObj.jwt
    }`;
  }
  return req;
});
