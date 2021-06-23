import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import { Button, IconContainer, ButtonText } from "./styles";

interface SignInSocialButtonProps extends RectButtonProps {
  title: string;
  icon: React.FC<SvgProps>;
}

export const SignInSocialButton: React.FC<SignInSocialButtonProps> = ({
  icon: Icon,
  title,
  ...props
}) => {
  return (
    <Button {...props}>
      <IconContainer>
        <Icon />
      </IconContainer>

      <ButtonText>{title}</ButtonText>
    </Button>
  );
};
