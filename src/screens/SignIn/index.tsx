import React, { useState } from "react";
import { useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";

import { SignInSocialButton } from "../../components/SignInSocialButton";

import { useAuth } from "../../hooks/auth";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export const SignIn: React.FC = () => {
  const theme = useTheme();

  const { signInWithGoogle, signInWithApple, isSigningIn } = useAuth();

  async function handleSignInWithGoogle(): Promise<void> {
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert("Ops, não foi possível entrar com a conta Google!");
    }
  }

  async function handleSignInWithApple(): Promise<void> {
    try {
      await signInWithApple();
    } catch (error) {
      Alert.alert("Ops, não foi possível entrar com a conta Apple!");
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {"\n"}
            finanças de forma {"\n"}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {"\n"}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            icon={GoogleSvg}
            title="Entrar com Google"
            onPress={handleSignInWithGoogle}
          />

          <SignInSocialButton
            icon={AppleSvg}
            title="Entrar com Apple"
            onPress={handleSignInWithApple}
          />
        </FooterWrapper>

        {isSigningIn && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 20 }}
          />
        )}
      </Footer>
    </Container>
  );
};
