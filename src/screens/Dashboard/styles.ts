import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  padding: 0 25px;

  justify-content: center;
  align-items: center;
  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const Photo = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: 10px;
  margin-right: 15px;
`;

export const User = styled.View``;

export const UserGretting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(17)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(17)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const PowerIcon = styled(Feather).attrs({
  name: "power",
})`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(22)}px;
`;
