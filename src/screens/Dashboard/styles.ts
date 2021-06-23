import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  getBottomSpace,
  getStatusBarHeight,
  isIphoneX,
} from "react-native-iphone-x-helper";
import { BorderlessButton } from "react-native-gesture-handler";

import { Transaction } from "../../services/transactions";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(35)}px;

  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const UserWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0 25px;
  margin-top: ${getStatusBarHeight() + 30}px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LogoutButton = styled(BorderlessButton)``;

export const Photo = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(25)}px;
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

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 25 },
})`
  width: 100%;
  position: absolute;

  margin-top: ${RFPercentage(19)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 25px;

  margin-top: ${isIphoneX() ? RFPercentage(12) : RFPercentage(14)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(17)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: 12.5px;
`;

export const TransactionCards = styled(
  FlatList as new () => FlatList<Transaction>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: getBottomSpace() },
})``;
