import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";

interface HighlightCardProps {}

export const HighlightCard: React.FC<HighlightCardProps> = () => {
  return (
    <Container>
      <Header>
        <Title>Entrada</Title>

        <Icon name="arrow-up-circle" />
      </Header>

      <Footer>
        <Amount>R$ 17.400,00</Amount>

        <LastTransaction>Ultimá entrada dia 13 de novembro</LastTransaction>
      </Footer>
    </Container>
  );
};
