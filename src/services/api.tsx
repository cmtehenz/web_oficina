import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const apiAuth = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies['flygo.token']}`
  }
})

export default api;
