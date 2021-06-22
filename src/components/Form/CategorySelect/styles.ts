import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface CategoryProps {
  isPlaceholder: boolean;
}

export const Container = styled(RectButton).attrs({
  activeOpacity: 0.1,
})`
  background-color: ${({ theme }) => theme.colors.shape};

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 16px 20px;
  border-radius: 5px;
`;

export const Category = styled.Text<CategoryProps>`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme, isPlaceholder }) =>
    isPlaceholder ? theme.colors.text : theme.colors.textDark};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: ${RFValue(18)}px;
`;
