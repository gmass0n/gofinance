import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(110)}px;

  align-items: center;
  justify-content: flex-end;
  padding: 25px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(16)}px;
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;

  padding: 25px;
  justify-content: space-between;
`;

export const FormFields = styled.View``;

export const TransactionTypeButtons = styled.View`
  flex-direction: row;
  align-items: center;
`;
