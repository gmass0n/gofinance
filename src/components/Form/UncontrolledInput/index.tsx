import React from "react";
import { Control, Controller } from "react-hook-form";

import { Input, InputProps } from "../Input";

import { Container } from "./styles";

interface UncontrolledInputProps extends InputProps {
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
