import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { TransactionType } from "../../../services/transactions";

import { Container, Icon, Title } from "./styles";

const icons: Record<TransactionType, string> = {
  positive: "arrow-up-circle",
  negative: "arrow-down-circle",
};

interface TransactionTypeButtonProps extends RectButtonProps {
  title: string;
  type: TransactionType;
  isActive: boolean;
}

export const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = ({
  title,
  type,
  isActive = false,
  ...props
}) => {
  return (
    <Container
      type={type}
      isActive={isActive}
      activeOpacity={isActive ? 0 : 0.1}
      {...props}
    >
      <Icon name={icons[type]} type={type} />

      <Title>{title}</Title>
    </Container>
  );
};
