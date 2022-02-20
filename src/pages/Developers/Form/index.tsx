import React from 'react';

import ButtonBack from '../../../components/ButtonBack';

import { Container, SubHeader } from '../styles';

const Form: React.FC = () => {
  return (
    <Container>
      <SubHeader>
        <ButtonBack goTo="/developers" title="Novo Desenvolvedor" />
      </SubHeader>
    </Container>
  );
};

export default Form;
