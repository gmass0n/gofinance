import React from "react";
import { TextInputProps } from "react-native";

import { Container, TextInput, ErrorMessage } from "./styles";

export interface InputProps extends TextInputProps {
  error?: string;
}

export const Input: React.FC<InputProps> = ({ error = "", ...props }) => {
  return (
    <Container>
      <TextInput {...props} />

      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};
