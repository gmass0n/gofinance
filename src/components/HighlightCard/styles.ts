import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { HighlightCardType } from ".";

interface TypeProps {
  type: HighlightCardType;
}

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type }) =>
    type === "total" ? theme.colors.secondary : theme.colors.shape};
  width: ${RFValue(280)}px;
  border-radius: 10px;
  padding: 20px;
  margin-right: 25px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.textDark};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ type, theme }) => {
    const iconColor: Record<HighlightCardType, string> = {
      down: theme.colors.attention,
      up: theme.colors.success,
      total: theme.colors.shape,
    };

    return css`
      color: ${iconColor[type]};
    `;
  }}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(30)}px;
  margin-top: ${RFValue(30)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.textDark};
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(13)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.text};
`;
