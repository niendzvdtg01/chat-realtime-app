import axios from "axios";

export const userServiceClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const userServiceFormClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});
