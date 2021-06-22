import React from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes: React.FC = () => {
  const theme = useTheme();

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,
        labelPosition: "beside-icon",
        style: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 88,
        },
        labelStyle: {
          fontFamily: theme.fonts.medium,
        },
      }}
    >
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Listagem",
          tabBarIcon: ({ color }) => (
            <Feather name="list" color={color} size={22} />
          ),
        }}
      />

      <Screen
        name="Register"
        component={Register}
        options={{
          tabBarLabel: "Registro",
          tabBarIcon: ({ color }) => (
            <Feather name="dollar-sign" color={color} size={22} />
          ),
        }}
      />

      <Screen
        name="Resume"
        component={Register}
        options={{
          tabBarLabel: "Resumo",
          tabBarIcon: ({ color }) => (
            <Feather name="pie-chart" color={color} size={22} />
          ),
        }}
      />
    </Navigator>
  );
};
