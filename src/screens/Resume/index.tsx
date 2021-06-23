import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { HistoryCard } from "../../components/HistoryCard";

import { loadTransactions } from "../../services/transactions";

import { categories as categoriesArr } from "../../utils/categories";
import { formatCurrency } from "../../utils/formatCurrency";

import { Container, Header, Title, CategoriesList } from "./styles";

export interface Category {
  id: string;
  title: string;
  amount: string;
  color: string;
}

export const Resume: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const transactions = await loadTransactions();

        if (transactions.length > 0) {
          const expensivesTransactions = transactions.filter(
            (transaction) => transaction.type === "negative"
          );

          const totalByCategories: Category[] = [];

          categoriesArr.forEach((category) => {
            let categorySum = 0;

            expensivesTransactions.forEach((expensiveTransaction) => {
              if (expensiveTransaction.category === category.key) {
                categorySum += expensiveTransaction.amount;
              }
            });

            if (categorySum > 0) {
              totalByCategories.push({
                id: category.key,
                title: category.name,
                amount: formatCurrency(categorySum),
                color: category.color,
              });
            }
          });

          setCategories(totalByCategories);
        }
      })();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <CategoriesList
        data={categories}
        keyExtractor={(category) => category.id}
        renderItem={({ item: category }) => (
          <HistoryCard
            title={category.title}
            amount={category.amount}
            color={category.color}
          />
        )}
      />
    </Container>
  );
};
