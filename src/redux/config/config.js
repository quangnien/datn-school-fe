import axios from "axios";

export const API = axios.create({ baseURL: "http://localhost:9090/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("adminUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("adminUser")).retObj.jwt
    }`;
  }
  return req;
});
