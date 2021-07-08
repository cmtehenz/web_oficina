import { createContext, ReactNode } from "react";
import { apiAuth } from "../services/api";

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn({ email, password}: SignInCredentials){
    try {
      const response = await apiAuth.post('sessions', {
        email,
        password
      })
      console.log(response.data);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated}}>
      { children }
    </AuthContext.Provider>
  )
}