import React from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { getBottomSpace, isIphoneX } from "react-native-iphone-x-helper";

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Resume } from "../screens/Resume";

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
          paddingBottom: isIphoneX() ? getBottomSpace() : 0,
          paddingTop: isIphoneX() ? getBottomSpace() / 2 : 0,
          height: isIphoneX() ? 88 : 60,
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
        component={Resume}
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
