import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestQueue = [];

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const apiAuth = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies['flygo.token']}`
  }
})

apiAuth.interceptors.response.use(response => {
  return response;
}, (error: AxiosError ) => {
  if(error.response.status === 401){
    if(error.response.data?.code === 'token.expired'){
      cookies = parseCookies();

      const { 'flygo.refreshToken': refreshToken } = cookies;
      const originalConfig = error.config;

      if(!isRefreshing){
        isRefreshing = true;
        apiAuth.post('/refresh', {
          refreshToken,
        }).then(response => {
          const { token } = response.data;

          setCookie(undefined, "flygo.token", token, {
            maxAge: 60 * 60 * 24 * 30, //30 days
            path: '/'
          });

          setCookie(undefined, "flygo.refreshToken", response.data.refreshToken, {
            maxAge: 60 * 60 * 24 * 30, //30 days
            path: '/'
          });

          apiAuth.defaults.headers['Authorization'] = `Bearer ${token}`;

          failedRequestQueue.forEach(request => request.onSuccess(token));
          failedRequestQueue = [];
        }).catch(err => {
          failedRequestQueue.forEach(request => request.onFailure(err));
          failedRequestQueue = [];
        }).finally(() => {
          isRefreshing = false;
        });
      }

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers['Authorization'] = `Bearer ${token}`;
            resolve(apiAuth(originalConfig));
          },
          onFailure: (err: AxiosError) => {
            reject(err);
          }
        })

      });
    } else {
      // deslogar usuario
    }
  }
});

export default api;
