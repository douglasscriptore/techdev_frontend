import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  color?: 'default' | 'primary' | 'accent' | 'secondary';
};

const Button: React.FC<ButtonProps> = ({
  color = 'default',
  loading,
  children,
  ...rest
}) => {
  return (
    <Container color={color} {...rest}>
      {loading ? 'Carregando ...' : children}
    </Container>
  );
};

export default Button;
