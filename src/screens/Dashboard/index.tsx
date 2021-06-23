import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";

import { loadTransactions, Transaction } from "../../services/transactions";

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
import { getHighlightData } from "../../utils/getHighlightData";

export const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const highlightData = getHighlightData(transactions);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await loadTransactions();

        setTransactions(response);
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
