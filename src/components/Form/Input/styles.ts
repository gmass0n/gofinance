import styled from "styled-components/native";
import { TextInput as RNTextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  margin-bottom: 15px;
`;

export const TextInput = styled(RNTextInput)`
  background-color: ${({ theme }) => theme.colors.shape};

  width: 100%;
  padding: 16px 20px;
  border-radius: 5px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.textDark};
`;

export const ErrorMessage = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.attention};

  margin-top: 5px;
`;
