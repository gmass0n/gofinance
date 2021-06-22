import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardData,
} from "../../components/TransactionCard";

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
import { formatDate } from "../../utils/formatDate";

export interface Transaction extends TransactionCardData {
  id: string;
}

export const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    (async () => {
      const storagedTransactions = await AsyncStorage.getItem('@gofinances:transactions');

      if(storagedTransactions) {
        const formattedTransaction = 
          (JSON.parse(storagedTransactions) as Transaction[]).map(transaction => {
            const formattedAmount = formatCurrency(Number(transaction.amount));
            const formattedDate = formatDate(new Date(transaction.date));
            
            return {
              ...transaction,
              amount: formattedAmount,
              date: formattedDate,
            }
          })
        
        setTransactions(formattedTransaction);
      }
    })()
  }, [])

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
