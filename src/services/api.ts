import axios from "axios";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const api = axios.create({
  baseURL: "https://abrigapp.onrender.com/api",
});


api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    const token = await getIdToken(user);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
