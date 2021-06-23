import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { ActivityIndicator } from "react-native";

import { HistoryCard } from "../../components/HistoryCard";
import { MonthSelect } from "../../components/MonthSelect";

import { loadTransactions } from "../../services/transactions";

import { categories as categoriesArr } from "../../utils/categories";
import { formatCurrency } from "../../utils/formatCurrency";

import { Container, Header, Title, Content, LoadingContainer } from "./styles";
import { TotalByCategoriesChart } from "../../components/TotalByCategoriesChart";

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

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setIsLoading(true);

        const transactions = await loadTransactions();

        if (transactions.length > 0) {
          const expensivesTransactions = transactions.filter(
            (transaction) =>
              transaction.type === "negative" &&
              new Date(transaction.date).getMonth() ===
                selectedDate.getMonth() &&
              new Date(transaction.date).getFullYear() ===
                selectedDate.getFullYear()
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

          setIsLoading(false);
        }
      })();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 25,
          paddingBottom: 10,
          flex: isLoading ? 1 : 0,
        }}
      >
        <MonthSelect date={selectedDate} onChange={setSelectedDate} />

        {isLoading ? (
          <LoadingContainer>
            <ActivityIndicator color={theme.colors.secondary} size="large" />
          </LoadingContainer>
        ) : (
          <>
            <TotalByCategoriesChart data={categories} />

            {categories.length > 0 &&
              categories.map((category) => (
                <HistoryCard
                  key={category.id}
                  title={category.title}
                  amount={category.formattedAmount}
                  color={category.color}
                />
              ))}
          </>
        )}
      </Content>
    </Container>
  );
};
