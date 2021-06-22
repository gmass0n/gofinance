import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes: React.FC = () => {
  return (
    <Navigator>
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="Register" component={Register} />
    </Navigator>
  );
};
