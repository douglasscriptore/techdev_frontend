import React from 'react';

import { FiLogOut } from 'react-icons/fi';
import { Container, Wrapper, Header, HeaderContent } from './styles';

import logo from '../../../assets/logo3.png';
import { useAuth } from '../../../hooks/auth';

const Default: React.FC = ({ children }) => {
  /**
   * Hooks
   */
  const { signOut } = useAuth();

  return (
    <Wrapper>
      <Header>
        <HeaderContent>
          <img src={logo} />
          <button onClick={() => signOut()}>
            Sair
            <FiLogOut />
          </button>
        </HeaderContent>
      </Header>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default Default;
