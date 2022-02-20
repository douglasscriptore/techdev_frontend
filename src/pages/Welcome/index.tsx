import React, { useCallback } from 'react';

import { FiArrowRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';

import { Wrapper, Container } from './styles';

const Welcome: React.FC = () => {
  /*
   * Hooks
   */
  const { signIn } = useAuth();
  const { push } = useHistory();

  const handleGoDashboard = useCallback(() => {
    signIn();
    push('dashboard');
  }, [push, signIn]);

  return (
    <Wrapper>
      <Container>
        <img src={logoImg} alt="imagem" />

        <h2>Seja Bem-Vindo</h2>

        <p>
          Esse desáfio foi estabelecido pela GazinTech e executado por Douglas
          Bento Scriptore
        </p>

        <button onClick={handleGoDashboard}>
          <span>Prosseguir</span>
          <FiArrowRight />
        </button>
      </Container>
    </Wrapper>
  );
};

export default Welcome;
