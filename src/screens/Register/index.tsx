import React from "react";

import { Input } from "../../components/Form/Input";

import { Container, Header, Title, Form } from "./styles";

export const Register: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Input placeholder="Digite o nome" />

        <Input placeholder="Digite o preço" />
      </Form>
    </Container>
  );
};
