import React, { useCallback, useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

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
import { useEffect } from "react";

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
  const navigation = useNavigation();

  const [selectedTransactionType, setSelectedTransactionType] =
    useState<TransactionType | "">("");

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | undefined>(undefined);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('@gofinances:transactions');

      if(data) {
        console.log(JSON.parse(data))
      }
    })()
  }, [])

  function handleSelectTransactionType(type: TransactionType): void {
    setSelectedTransactionType(type);
  }

  const handleSelectCategory = useCallback((category: CategoryProps) => {
    setSelectedCategory(category);
  }, []);

  async function handleRegister(formData: FormData): Promise<void> {
    if (!selectedTransactionType) {
      return Alert.alert("Por favor, selecione o tipo da transação!");
    }
   
    if (!selectedCategory) { 
      return Alert.alert("Por favor, selecione a categoria!");
    }

    const data = {
      id: String(uuid.v4()),
      name: formData.name,
      amount: formData.amount,
      transactionType: selectedTransactionType,
      category: selectedCategory?.key,
      date: new Date()
    }; 
  
    try {
      const storagedTransactions = await AsyncStorage.getItem('@gofinances:transactions');
      const transactions = storagedTransactions ? JSON.parse(storagedTransactions) : [];

      const newTransactions = [...transactions, data];

      await AsyncStorage.setItem('@gofinances:transactions', JSON.stringify(newTransactions));

      setSelectedCategory(undefined);
      setSelectedTransactionType('');
      reset()

      navigation.navigate('Dashboard')
    } catch (error) {
      console.log(error); 
      Alert.alert("Ops, não foi possível salvar!")
    }
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
