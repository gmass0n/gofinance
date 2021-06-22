import React from "react";
import { categories } from "../../utils/categories";

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

export interface TransactionCardData {
  type: TransactionCardType;
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface TransactionCardProps {
  data: TransactionCardData;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ data }) => {
  const { name, amount, category, date, type } = data;

  const findCategory = categories.find(item => item.key === category);

  return (
    <Container>
      <Title>{name}</Title>

      <Amount type={type}>
        {type === "negative" ? "- " : ""}
        {amount}
      </Amount>

      <Footer>
        <Category>
          {findCategory && (
            <>
              <Icon name={findCategory.icon} />

              <CategoryName>{findCategory.name}</CategoryName>
            </>
          )}
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};
