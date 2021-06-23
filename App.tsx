import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import React from "react";
import { ThemeProvider } from "styled-components";
import { StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { theme } from "./src/global/styles/theme";

import { Routes } from "./src/routes";
import { SignIn } from "./src/screens/SignIn";

export const App: React.FC = () => {
  const [isFontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!isFontsLoaded) return <AppLoading />;

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />

      {/* <Routes /> */}

      <SignIn />
    </ThemeProvider>
  );
};
