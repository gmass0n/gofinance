import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { VictoryPie } from "victory-native";
import { useTheme } from "styled-components";

import { HistoryCard } from "../../components/HistoryCard";

import { loadTransactions } from "../../services/transactions";

import { categories as categoriesArr } from "../../utils/categories";
import { formatCurrency } from "../../utils/formatCurrency";

import { Container, Header, Title, Content, ChartContainer } from "./styles";

export interface Category {
  id: string;
  title: string;
  amount: number;
  formattedAmount: string;
  color: string;
  percentage: number;
  formattedPercentage: string;
}

export const Resume: React.FC = () => {
  const theme = useTheme();

  const [categories, setCategories] = useState<Category[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const transactions = await loadTransactions();

        if (transactions.length > 0) {
          const expensivesTransactions = transactions.filter(
            (transaction) => transaction.type === "negative"
          );

          const expensivesTransactionsTotal = expensivesTransactions.reduce(
            (acc, expensiveTransaction) => {
              return acc + expensiveTransaction.amount;
            },
            0
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
              const percentage =
                (categorySum / expensivesTransactionsTotal) * 100;
              const formattedPercentage = `${percentage.toFixed(0)}%`;

              totalByCategories.push({
                id: category.key,
                title: category.name,
                amount: categorySum,
                formattedAmount: formatCurrency(categorySum),
                color: category.color,
                percentage,
                formattedPercentage,
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

      <Content>
        <ChartContainer>
          <VictoryPie
            data={categories}
            colorScale={categories.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(17),
                fontWeight: "bold",
                fill: theme.colors.shape,
              },
            }}
            labelRadius={60}
            x="formattedPercentage"
            y="percentage"
          />
        </ChartContainer>

        {categories.length > 0 &&
          categories.map((category) => (
            <HistoryCard
              key={category.id}
              title={category.title}
              amount={category.formattedAmount}
              color={category.color}
            />
          ))}
      </Content>
    </Container>
  );
};
