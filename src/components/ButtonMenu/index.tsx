import React, { useCallback } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

interface ButtonMenuProps {
  goTo: string;
}

const ButtonMenu: React.FC<ButtonMenuProps> = ({ goTo, children }) => {
  const { push } = useHistory();

  const handleGo = useCallback(() => {
    push(goTo);
  }, [goTo, push]);

  return (
    <Container>
      <button onClick={handleGo}>
        {children} <FiArrowRight />
      </button>
    </Container>
  );
};

export default ButtonMenu;
