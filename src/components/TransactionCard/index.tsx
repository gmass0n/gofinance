import React from "react";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

export type TransactionCardType = "positive" | "negative";

interface TransactionCardCategory {
  icon: string;
  name: string;
}

export interface TransactionCardData {
  type: TransactionCardType;
  title: string;
  amount: string;
  category: TransactionCardCategory;
  date: string;
}

interface TransactionCardProps {
  data: TransactionCardData;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ data }) => {
  const { title, amount, category, date, type } = data;

  return (
    <Container>
      <Title>{title}</Title>

      <Amount type={type}>
        {type === "negative" ? "- " : ""}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />

          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};
