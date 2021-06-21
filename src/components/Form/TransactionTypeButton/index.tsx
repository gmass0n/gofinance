import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title, } from './styles';

export type TransactionType = 'up' | 'down';

const icons: Record<TransactionType, string> = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

interface TransactionTypeButtonProps extends TouchableOpacityProps{
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
      activeOpacity={isActive ? 1 : 0.6}
      {...props}
    >
      <Icon name={icons[type]} type={type}/>

      <Title>{title}</Title>
    </Container>
  )
}
