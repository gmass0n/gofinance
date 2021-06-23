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
  amount: number;
  category: string;
  date: string;
  formattedAmount?: string;
  formattedDate?: string;
}

interface TransactionCardProps {
  data: TransactionCardData;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ data }) => {
  const { name, formattedAmount, category, formattedDate, type } = data;

  const findCategory = categories.find((item) => item.key === category);

  return (
    <Container>
      <Title>{name}</Title>

      <Amount type={type}>
        {type === "negative" ? "- " : ""}
        {formattedAmount}
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

        <Date>{formattedDate}</Date>
      </Footer>
    </Container>
  );
};
