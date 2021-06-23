import React from "react";
import { Host } from "react-native-portalize";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { useAuth } from "../hooks/auth";

export const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Host>
      <NavigationContainer>
        {!!user ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Host>
  );
};
