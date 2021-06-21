import React from "react";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";

import { Container, Header, Title, Form, FormFields } from "./styles";

export const Register: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <FormFields>
          <Input placeholder="Digite o nome" />

          <Input placeholder="Digite o preço" />
        </FormFields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
};
