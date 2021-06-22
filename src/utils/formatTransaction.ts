import { Transaction } from "../screens/Dashboard";

import { formatCurrency } from "./formatCurrency";
import { formatDate } from "./formatDate";

export function formatTransaction(transaction: Transaction): Transaction {
  const formattedAmount = formatCurrency(Number(transaction.amount));
  const formattedDate = formatDate(new Date(transaction.date));

  return {
    ...transaction,
    formattedAmount,
    formattedDate,
  };
}
