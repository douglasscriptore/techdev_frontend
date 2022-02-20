import React, { useCallback } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

interface ButtonBackProps {
  title?: string;
  goTo?: string;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ title, goTo }) => {
  const { push, goBack } = useHistory();

  const handleGoBack = useCallback(() => {
    goTo ? push(goTo) : goBack();
  }, [goBack, goTo, push]);

  return (
    <Container onClick={handleGoBack}>
      <FiArrowLeft />
      {title && <h3>{title}</h3>}
    </Container>
  );
};

export default ButtonBack;
