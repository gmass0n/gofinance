import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { FlatList, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { categories } from "../../../../utils/categories";

interface CategoryProps {
  isSelected: boolean;
}

export const Header = styled.View`
  width: 100%;
  align-items: center;
  justify-content: flex-end;

  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  padding: 25px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textDark};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(16)}px;
`;

export const CategoriesList = styled(
  FlatList as new () => FlatList<typeof categories[0]>
)`
  flex: 1;
  width: 100%;
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: 16px 25px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.secondaryLight : theme.colors.shape};

  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-top-color: ${({ theme }) => theme.colors.text};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(18)}px;
  margin-right: 15px;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.textDark};
`;
