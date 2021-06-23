import React, { createContext, useCallback, useContext, useState } from "react";
import * as Google from "expo-google-app-auth";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  photo?: string;
  name: string;
  email: string;
}

interface IAuthContextData {
  user: User | null;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "144146686377-avq9tgeituuv2s5qnhnma806g4nin91r.apps.googleusercontent.com",
        androidClientId:
          "144146686377-pmqh1tn0kf7rlu8o2oi8nkojscogunj8.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const loggedUser: User = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!,
        };

        await AsyncStorage.setItem(
          "@gofinances:user",
          JSON.stringify(loggedUser)
        );

        setUser(loggedUser);
      }
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const signInWithApple = useCallback(async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log(credential);

      // if (credential) {
      //   const loggedUser: User = {
      //     id: String(credential.user),
      //     email: credential.email!,
      //     name: credential.fullName!.givenName!,
      //   };

      //   await AsyncStorage.setItem(
      //     "@gofinances:user",
      //     JSON.stringify(loggedUser)
      //   );

      //   setUser(loggedUser);
      // }
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContextData => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
