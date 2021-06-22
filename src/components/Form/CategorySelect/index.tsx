import React, { useRef } from "react";
import { useCallback } from "react";
import { Modalize } from "react-native-modalize";

import { CategoriesListModal, CategoryProps } from "./CategoriesListModal";

import { Container, Category, Icon } from "./styles";

interface CategorySelectProps {
  category: CategoryProps;
  onSelectCategory(category: CategoryProps): void;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  category,
  onSelectCategory,
}) => {
  const modalRef = useRef<Modalize>(null);

  function handleOpenCategoriesListModal(): void {
    modalRef.current?.open();
  }

  const handleSelectCategory = useCallback((category: CategoryProps) => {
    onSelectCategory(category);

    modalRef.current?.close();
  }, []);

  return (
    <>
      <Container onPress={handleOpenCategoriesListModal}>
        <Category>{category.name}</Category>

        <Icon name="chevron-down" />
      </Container>

      <CategoriesListModal
        category={category}
        onSelectCategory={handleSelectCategory}
        ref={modalRef}
      />
    </>
  );
};
