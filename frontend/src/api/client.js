import axios from "axios";

const client = axios.create({
baseURL: "https://herbalhub-6xev.onrender.com/api",
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("herbalhub_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
