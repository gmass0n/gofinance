import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";

import { Input } from "../Input";

import { Container } from "./styles";

interface UncontrolledInputProps extends TextInputProps {
  control: Control;
  name: string;
}

export const UncontrolledInput: React.FC<UncontrolledInputProps> = ({
  name,
  control,
  ...props
}) => {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...props} />
        )}
      />
    </Container>
  );
};
