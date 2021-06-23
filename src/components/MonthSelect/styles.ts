import { BorderlessButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 25px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(22)}px;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(17)}px;
  color: ${({ theme }) => theme.colors.textDark};
`;
