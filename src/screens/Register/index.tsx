import React, { useState } from "react";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { CategorySelect } from "../../components/Form/CategorySelect";
import {
  TransactionType,
  TransactionTypeButton,
} from "../../components/Form/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  FormFields,
  TransactionTypeButtons,
} from "./styles";

export const Register: React.FC = () => {
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<TransactionType | "">("");

  function handleSelectTransactionType(type: TransactionType): void {
    setSelectedTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <FormFields>
          <Input placeholder="Digite o nome" />

          <Input placeholder="Digite o preço" />

          <TransactionTypeButtons>
            <TransactionTypeButton
              type="up"
              title="Income"
              style={{ marginRight: 15 }}
              isActive={selectedTransactionType === "up"}
              onPress={() => handleSelectTransactionType("up")}
            />

            <TransactionTypeButton
              type="down"
              title="Outcome"
              isActive={selectedTransactionType === "down"}
              onPress={() => handleSelectTransactionType("down")}
            />
          </TransactionTypeButtons>

          <CategorySelect title="Alimentação" />
        </FormFields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
};
