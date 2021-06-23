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
import { formatLastTransaction } from "../../utils/formatLastTransaction";

export interface Transaction extends TransactionCardData {
  id: string;
}

interface HighlightData {
  entries: {
    amount: number;
    formattedAmount: string;
    lastTransaction: string;
  };
  expensives: {
    amount: number;
    formattedAmount: string;
    lastTransaction: string;
  };
  total: {
    amount: number;
    formattedAmount: string;
    lastTransaction: string;
  };
}

const initialHighlightData: HighlightData = {
  entries: {
    amount: 0,
    formattedAmount: "",
    lastTransaction: "",
  },
  expensives: {
    amount: 0,
    formattedAmount: "",
    lastTransaction: "",
  },
  total: {
    amount: 0,
    formattedAmount: "",
    lastTransaction: "",
  },
};

export const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const highlightData = transactions.reduce((acc, transaction) => {
    let entriesAmount = acc.entries.amount;
    let entriesFormattedAmount = acc.entries.formattedAmount;
    let entriesLastTransaction = acc.entries.lastTransaction;

    let expensivesAmount = acc.expensives.amount;
    let expensivesFormattedAmount = acc.expensives.formattedAmount;
    let expensivesLastTransaction = acc.expensives.lastTransaction;

    if (transaction.type === "positive") {
      entriesAmount = acc.entries.amount + transaction.amount;
      entriesFormattedAmount = formatCurrency(entriesAmount);
      entriesLastTransaction = formatLastTransaction(
        new Date(transaction.date),
        "positive"
      );
    }

    if (transaction.type === "negative") {
      expensivesAmount = acc.expensives.amount - transaction.amount;
      expensivesFormattedAmount = formatCurrency(expensivesAmount);
      expensivesLastTransaction = formatLastTransaction(
        new Date(transaction.date),
        "negative"
      );
    }

    const totalAmount = entriesAmount + expensivesAmount;
    const totalFormattedAmount = formatCurrency(totalAmount);
    const totalLastTransaction = formatLastTransaction(
      new Date(transaction.date),
      "total"
    );

    return {
      ...acc,
      entries: {
        amount: entriesAmount,
        formattedAmount: entriesFormattedAmount,
        lastTransaction: entriesLastTransaction,
      },
      expensives: {
        amount: expensivesAmount,
        formattedAmount: expensivesFormattedAmount,
        lastTransaction: expensivesLastTransaction,
      },
      total: {
        amount: totalAmount,
        formattedAmount: totalFormattedAmount,
        lastTransaction: totalLastTransaction,
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
          lastTransaction={highlightData.entries.lastTransaction}
        />

        <HighlightCard
          type="down"
          title="Saída"
          amount={highlightData.expensives.formattedAmount}
          lastTransaction={highlightData.expensives.lastTransaction}
        />

        <HighlightCard
          type="total"
          title="Saída"
          amount={highlightData.total.formattedAmount}
          lastTransaction={highlightData.total.lastTransaction}
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
