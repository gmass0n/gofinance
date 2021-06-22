import React from "react";
import { Host } from "react-native-portalize";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./AppRoutes";

export const Routes: React.FC = () => {
  return (
    <Host>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </Host>
  );
};
