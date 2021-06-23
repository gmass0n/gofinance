import { Transaction } from "../services/transactions";

import { formatCurrency } from "./formatCurrency";
import { formatLastTransaction } from "./formatLastTransaction";

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

export function getHighlightData(transactions: Transaction[]): HighlightData {
  return transactions.reduce((acc, transaction) => {
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
}
