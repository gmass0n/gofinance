import React from "react";
import { TouchableOpacity } from "react-native";

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGretting,
  UserName,
  PowerIcon,
} from "./styles";

export const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <UserInfo>
          <Photo source={{ uri: "https://github.com/gmass0n.png" }} />

          <User>
            <UserGretting>Olá, </UserGretting>

            <UserName>Gabriel</UserName>
          </User>
        </UserInfo>

        <TouchableOpacity activeOpacity={0.5}>
          <PowerIcon />
        </TouchableOpacity>
      </Header>
    </Container>
  );
};
