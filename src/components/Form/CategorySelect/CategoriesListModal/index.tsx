import React, { forwardRef } from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { RFPercentage } from "react-native-responsive-fontsize";

import { categories } from "../../../../utils/categories";

import { Header, Title, Category, Icon, Name } from "./styles";

export interface CategoryProps {
  key: string;
  name: string;
}

interface CategoriesListModalProps {
  category: CategoryProps;
  onSelectCategory(category: CategoryProps): void;
}

const CategoriesListModalComponent: React.ForwardRefRenderFunction<
  Modalize,
  CategoriesListModalProps
> = ({ category, onSelectCategory }, ref) => {
  return (
    <Portal>
      <Modalize
        ref={ref}
        modalHeight={RFPercentage(75)}
        HeaderComponent={
          <Header>
            <Title>Categoria</Title>
          </Header>
        }
        flatListProps={{
          data: categories,
          keyExtractor: (item) => item.key,
          renderItem: ({ item }) => (
            <Category
              onPress={() => onSelectCategory(item)}
              isSelected={item.key === category.key}
            >
              <Icon name={item.icon} />

              <Name>{item.name}</Name>
            </Category>
          ),
        }}
      />
    </Portal>
  );
};

export const CategoriesListModal = forwardRef(CategoriesListModalComponent);
