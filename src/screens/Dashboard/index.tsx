import React from "react";
import { TouchableOpacity } from "react-native";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardData,
} from "../../components/TransactionCard";

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
  TransactionCards,
} from "./styles";

export interface Transaction extends TransactionCardData {
  id: string;
}

const data: Transaction[] = [
  {
    id: "1",
    type: "positive",
    title: "Desenvolvimento",
    amount: "R$ 12.000,00",
    date: "03/04/2021",
    category: {
      icon: "dollar-sign",
      name: "Vendas",
    },
  },
  {
    id: "2",
    type: "negative",
    title: "Hamgugeria",
    amount: "R$ 59,00",
    date: "03/04/2021",
    category: {
      icon: "coffee",
      name: "Alimentação",
    },
  },
  {
    id: "3",
    type: "negative",
    title: "Aluguel do apartamento",
    amount: "R$ 1.200,00",
    date: "03/04/2021",
    category: {
      icon: "shopping-bag",
      name: "Casa",
    },
  },
];

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

        <TransactionCards
          data={data}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
