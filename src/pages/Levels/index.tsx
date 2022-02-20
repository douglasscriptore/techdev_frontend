import React from 'react';
import ButtonBack from '../../components/ButtonBack';
import { Content, Left, Right } from '../Dashboard/styles';

import { Container, SubHeader } from './styles';

const Developers: React.FC = () => {
  return (
    <Container>
      <SubHeader>
        <ButtonBack goTo="/dashboard" title="Níveis" />
      </SubHeader>
    </Container>
  );
};

export default Developers;
