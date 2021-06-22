import React, { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export interface Transaction extends TransactionCardData {
  id: string;
}

export const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const storagedTransactions = await AsyncStorage.getItem('@gofinances:transactions');

        if(storagedTransactions) {
          const formattedTransaction = 
            (JSON.parse(storagedTransactions) as Transaction[])
              .map(transaction => formatTransaction(transaction))
          
          setTransactions(formattedTransaction);
        }
      })()
    }, [])
  )

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
          amount="R$ 17.300,40"
          lastTransaction="Última entrada dia 13 de novembro"
        />

        <HighlightCard
          type="down"
          title="Saída"
          amount="R$ 1.300,40"
          lastTransaction="Última saída dia 12 de novembro"
        />

        <HighlightCard
          type="total"
          title="Saída"
          amount="R$ 16.000,00"
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
