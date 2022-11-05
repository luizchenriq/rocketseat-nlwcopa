import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSessiom from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

interface UserProps {
  name: string;
  avatarUrl: string;
}

WebBrowser.maybeCompleteAuthSession();

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [ user, setUser ] = useState<UserProps>({} as UserProps);
  const [ isUserLoading, setIsUserLoaing ] = useState(false);

  const [ request, response, promptAsync ] = Google.useAuthRequest({
    clientId: '492995833769-d8otmp3n2dqoko51d8v6q8l2dmvi4cf6.apps.googleusercontent.com',
    redirectUri: AuthSessiom.makeRedirectUri({ useProxy: true, }),
    scopes: ['profile', 'email']
  })

  async function signIn() {
    try {
      setIsUserLoaing(true);
      await promptAsync();

    } catch (error) {
      console.log(error);
      throw error;

    } finally {
      setIsUserLoaing(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    console.log("TOKEN DE AUTENTICACAO =>", access_token);
  }

  useEffect( () => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [ response ]);

  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user,
    }}>
    </AuthContext.Provider>
  );
}