import { RectButton } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";

import { TransactionType } from ".";

interface ContainerProps {
  isActive: boolean;
  type: TransactionType;
}

interface IconProps {
  type: TransactionType;
}

export const Container = styled(RectButton)<ContainerProps>`
  flex: 1;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.shape};
  padding: 16px 20px;
  border-radius: 5px;

  ${({ theme, type, isActive }) => (type === 'positive' && isActive) && css`
    background-color: ${theme.colors.successLight};
  `}

  ${({ theme, type, isActive }) => (type === 'negative' && isActive) && css`
    background-color: ${theme.colors.attentionLight};
  `}
`;

export const Icon  = styled(Feather)<IconProps>`
  font-size: ${RFValue(20)}px;
  margin-right: 10px;

  color: ${({ theme, type }) => type === 'positive' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.textDark};
`;

