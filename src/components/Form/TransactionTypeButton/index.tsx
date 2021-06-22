import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Icon, Title, } from './styles';

export type TransactionType = 'up' | 'down';

const icons: Record<TransactionType, string> = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

interface TransactionTypeButtonProps extends RectButtonProps {
  title: string;
  type: TransactionType;
  isActive: boolean; 
}

export const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = ({ 
  title, 
  type,
  isActive = false,
  ...props 
}) => {
  return (
    <Container 
      type={type} 
      isActive={isActive} 
      activeOpacity={isActive ? 0 : 0.1}
      {...props}
    >
      <Icon name={icons[type]} type={type}/>

      <Title>{title}</Title>
    </Container>
  )
}
