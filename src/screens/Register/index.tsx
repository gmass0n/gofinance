import React, { useCallback, useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { UncontrolledInput } from "../../components/Form/UncontrolledInput";
import { Button } from "../../components/Form/Button";
import { CategorySelect } from "../../components/Form/CategorySelect";
import {
  TransactionType,
  TransactionTypeButton,
} from "../../components/Form/TransactionTypeButton";
import { CategoryProps } from "../../components/Form/CategorySelect/CategoriesListModal";

import {
  Container,
  Header,
  Title,
  Form,
  FormFields,
  TransactionTypeButtons,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

const formSchema = Yup.object().shape({
  name: Yup.string().required("Por favor, insira o nome."),
  amount: Yup.number()
    .typeError("Ops, informe um valor númerico.")
    .positive("Ops, o valor não pode ser negativo.")
    .required("Por favor, insira o preço."),
});

export const Register: React.FC = () => {
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<TransactionType | "">("");

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | undefined>(undefined);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  function handleSelectTransactionType(type: TransactionType): void {
    setSelectedTransactionType(type);
  }

  const handleSelectCategory = useCallback((category: CategoryProps) => {
    setSelectedCategory(category);
  }, []);

  function handleRegister(formData: FormData): void {
    if (!selectedTransactionType) {
      return Alert.alert("Selecione o tipo da transação!");
    }

    if (!selectedCategory) {
      return Alert.alert("Selecione a categoria!");
    }

    const data = {
      name: formData.name,
      amount: formData.amount,
      transactionType: selectedTransactionType,
      category: selectedCategory?.key,
    };

    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <FormFields>
            <UncontrolledInput
              name="name"
              control={control}
              placeholder="Insira o nome"
              autoCapitalize="sentences"
              autoFocus
              error={errors.name && errors.name.message}
            />

            <UncontrolledInput
              name="amount"
              control={control}
              placeholder="Insira o preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
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
    </TouchableWithoutFeedback>
  );
};
