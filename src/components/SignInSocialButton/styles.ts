import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Button = styled(RectButton)`
  height: ${RFValue(56)}px;

  background-color: ${({ theme }) => theme.colors.shape};

  border-radius: 5px;

  flex-direction: row;
  align-items: center;

  margin-bottom: 15px;
`;

export const IconContainer = styled.View`
  height: 100%;

  justify-content: center;
  align-items: center;

  padding: ${RFValue(15)}px;

  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px;
`;

export const ButtonText = styled.Text`
  flex: 1;
  text-align: center;

  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.textDark};
  font-size: ${RFValue(14)}px;
`;
