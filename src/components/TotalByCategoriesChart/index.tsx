import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { VictoryPie } from "victory-native";

import { Container } from "./styles";

interface Data {
  percentage: number;
  formattedPercentage: string;
  color: string;
}

interface TotalByCategoriesChartProps {
  data: Data[];
}

export const TotalByCategoriesChart: React.FC<TotalByCategoriesChartProps> = ({
  data,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <VictoryPie
        data={data}
        colorScale={data.map((item) => item.color)}
        style={{
          labels: {
            fontSize: RFValue(17),
            fontWeight: "bold",
            fill: theme.colors.shape,
          },
        }}
        labelRadius={60}
        x="formattedPercentage"
        y="percentage"
      />
    </Container>
  );
};
