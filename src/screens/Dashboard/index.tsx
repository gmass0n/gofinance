import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardData,
} from "../../components/TransactionCard";

import { formatTransaction } from "../../utils/formatTransaction";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  LogoutButton,
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
import { formatCurrency } from "../../utils/formatCurrency";

export interface Transaction extends TransactionCardData {
  id: string;
}

interface HighlightData {
  entries: {
    amount: number;
    formattedAmount: string;
  };
  expensives: {
    amount: number;
    formattedAmount: string;
  };
  total: {
    amount: number;
    formattedAmount: string;
  };
}

const initialHighlightData: HighlightData = {
  entries: {
    amount: 0,
    formattedAmount: "",
  },
  expensives: {
    amount: 0,
    formattedAmount: "",
  },
  total: {
    amount: 0,
    formattedAmount: "",
  },
};

export const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const highlightData = transactions.reduce((acc, transaction) => {
    let entriesAmount = acc.entries.amount;
    let formattedEntriesAmount = acc.entries.formattedAmount;

    let expensivesAmount = acc.expensives.amount;
    let formattedExpensivesAmount = acc.expensives.formattedAmount;

    if (transaction.type === "positive") {
      entriesAmount = acc.entries.amount + transaction.amount;
      formattedEntriesAmount = formatCurrency(entriesAmount);
    }

    if (transaction.type === "negative") {
      expensivesAmount = acc.expensives.amount - transaction.amount;
      formattedExpensivesAmount = formatCurrency(expensivesAmount);
    }

    const totalAmount = entriesAmount + expensivesAmount;
    const formattedTotalAmount = formatCurrency(totalAmount);

    return {
      ...acc,
      entries: {
        amount: entriesAmount,
        formattedAmount: formattedEntriesAmount,
      },
      expensives: {
        amount: expensivesAmount,
        formattedAmount: formattedExpensivesAmount,
      },
      total: {
        amount: totalAmount,
        formattedAmount: formattedTotalAmount,
      },
    };
  }, initialHighlightData);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const storagedTransactions = await AsyncStorage.getItem(
          "@gofinances:transactions"
        );

        if (storagedTransactions) {
          const formattedTransaction = (
            JSON.parse(storagedTransactions) as Transaction[]
          ).map((transaction) => formatTransaction(transaction));

          setTransactions(formattedTransaction);
        }
      })();
    }, [])
  );

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

          <LogoutButton onPress={() => {}}>
            <PowerIcon />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entrada"
          amount={highlightData.entries.formattedAmount}
          lastTransaction="Última entrada dia 13 de novembro"
        />

        <HighlightCard
          type="down"
          title="Saída"
          amount={highlightData.expensives.formattedAmount}
          lastTransaction="Última saída dia 12 de novembro"
        />

        <HighlightCard
          type="total"
          title="Saída"
          amount={highlightData.total.formattedAmount}
          lastTransaction="01 à 16 de novembro"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionCards
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
