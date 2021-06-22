import React, { useCallback, useState } from "react";

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
import { CategoryProps } from "../../components/Form/CategorySelect/CategoriesListModal";

export const Register: React.FC = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<TransactionType | "">("");

  const [selectedCategory, setSelectedCategory] = useState({
    key: "category",
    name: "Category",
  } as CategoryProps);

  function handleSelectTransactionType(type: TransactionType): void {
    setSelectedTransactionType(type);
  }

  const handleSelectCategory = useCallback((category: CategoryProps) => {
    setSelectedCategory(category);
  }, []);

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

          <CategorySelect
            category={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </FormFields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
};
