import React, { useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import ButtonBack from '../../components/ButtonBack';
import { Content, Left, Right } from '../Dashboard/styles';

import { Container, SubHeader } from './styles';

const Developers: React.FC = () => {
  /**
   * Hooks
   */
  const { push } = useHistory();

  const handleNewDeveloper = useCallback(() => {
    push('/developers/new');
  }, [push]);

  return (
    <Container>
      <SubHeader>
        <ButtonBack goTo="/dashboard" title="Desenvolvedores" />
        <Button onClick={handleNewDeveloper}>
          <FiPlus />
          Novo Desenvolvedor
        </Button>
      </SubHeader>
    </Container>
  );
};

export default Developers;
