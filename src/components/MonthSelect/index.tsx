import React from "react";
import { format, addMonths, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Container, MonthSelectButton, MonthSelectIcon, Month } from "./styles";

interface MonthSelectProps {
  date: Date;
  onChange(date: Date): void;
}

export const MonthSelect: React.FC<MonthSelectProps> = ({ date, onChange }) => {
  function handleChangeSelectedDate(action: "previous" | "next"): void {
    let updatedDate = date;

    if (action === "next") {
      updatedDate = addMonths(updatedDate, 1);
    } else {
      updatedDate = subMonths(updatedDate, 1);
    }

    onChange(updatedDate);
  }

  return (
    <Container>
      <MonthSelectButton onPress={() => handleChangeSelectedDate("previous")}>
        <MonthSelectIcon name="chevron-left" />
      </MonthSelectButton>

      <Month>{format(date, "MMMM, yyyy", { locale: ptBR })}</Month>

      <MonthSelectButton onPress={() => handleChangeSelectedDate("next")}>
        <MonthSelectIcon name="chevron-right" />
      </MonthSelectButton>
    </Container>
  );
};
