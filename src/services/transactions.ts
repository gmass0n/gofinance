import AsyncStorage from "@react-native-async-storage/async-storage";

import { formatTransaction } from "../utils/formatTransaction";

export type TransactionType = "positive" | "negative";

export interface Transaction {
  id: string;
  type: TransactionType;
  name: string;
  amount: number;
  category: string;
  date: string;
  formattedAmount?: string;
  formattedDate?: string;
}

export async function loadTransactions(userId: string): Promise<Transaction[]> {
  const storagedTransactions = await AsyncStorage.getItem(
    `@gofinances:${userId}:transactions`
  );

  if (storagedTransactions) {
    const formattedTransactions = (
      JSON.parse(storagedTransactions) as Transaction[]
    ).map((transaction) => formatTransaction(transaction));

    return formattedTransactions;
  }

  return [];
}
