import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { UncontrolledInput } from "../../components/Form/UncontrolledInput";
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
import { CategoryProps } from "../../components/Form/CategorySelect/CategoriesListModal";

interface FormData {
  name: string;
  amount: string;
}

export const Register: React.FC = () => {
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<TransactionType | "">("");

  const [selectedCategory, setSelectedCategory] = useState({
    key: "category",
    name: "Category",
  } as CategoryProps);

  const { control, handleSubmit } = useForm();

  function handleSelectTransactionType(type: TransactionType): void {
    setSelectedTransactionType(type);
  }

  const handleSelectCategory = useCallback((category: CategoryProps) => {
    setSelectedCategory(category);
  }, []);

  function handleRegister(formData: FormData): void {
    const data = {
      ...formData,
      transactionType: selectedTransactionType,
      category: selectedCategory.key,
    };

    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <FormFields>
          <UncontrolledInput
            name="name"
            control={control}
            placeholder="Digite o nome"
          />

          <UncontrolledInput
            name="amount"
            control={control}
            placeholder="Digite o preço"
          />

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

          <CategorySelect
            category={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </FormFields>

        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
      </Form>
    </Container>
  );
};
