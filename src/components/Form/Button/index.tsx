import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Title } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
  onPress(): void;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, ...props }) => {
  return (
    <Container onPress={onPress} {...props}>
      <Title>{title}</Title>
    </Container>
  );
};
