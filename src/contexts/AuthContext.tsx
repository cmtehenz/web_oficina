import { createContext, ReactNode, useState } from "react";
import Router from "next/router";
import { apiAuth } from "../services/api";

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

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  async function signIn({ email, password}: SignInCredentials){
    try {
      const response = await apiAuth.post('sessions', {
        email,
        password
      })

      const { permissions, roles } = response.data;

      setUser({
        email,
        permissions,
        roles,
      });

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
