import React from "react";
import { TouchableOpacity } from "react-native";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGretting,
  UserName,
  PowerIcon,
  HighlightCards,
  Transactions,
  Title,
} from "./styles";

export const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <UserWrapper>
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
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entrada"
          amount="R$ 17.300,40"
          lastTransaction="Última entrada dia 13 de novembro"
        />

        <HighlightCard
          type="down"
          title="Saída"
          amount="R$ 1.300,40"
          lastTransaction="Última saída dia 12 de novembro"
        />

        <HighlightCard
          type="total"
          title="Saída"
          amount="R$ 16.000,00"
          lastTransaction="01 à 16 de novembro"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionCard />
      </Transactions>
    </Container>
  );
};
