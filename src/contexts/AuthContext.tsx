import { createContext, ReactNode, useState, useEffect } from "react";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { apiAuth } from "../services/apiClient";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  destroyCookie(undefined, 'flygo.token');
  destroyCookie(undefined, 'flygo.refreshToken');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'flygo.token': token} = parseCookies();

    if(token){
      apiAuth.get('/me')
        .then(response => {
          const { email, permissions, roles } = response.data;
          setUser({ email, permissions, roles});
      }).catch(() => {
          signOut();
        })
    }
  }, [])

  async function signIn({ email, password}: SignInCredentials){
    try {
      const response = await apiAuth.post('sessions', {
        email,
        password
      })

      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, "flygo.token", token, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: '/'
      });

      setCookie(undefined, "flygo.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: '/'
      });

      setUser({
        email,
        permissions,
        roles,
      });

      apiAuth.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard')

    } catch(e) {
      console.log(e);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, user, isAuthenticated}}>
      { children }
    </AuthContext.Provider>
  )
}
