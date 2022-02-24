import styled, { keyframes } from 'styled-components';

export const FadeInDown = keyframes`
  0%{
    opacity: 0;
    transform: translateY(-20px)
  }

  100%{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const FadeInUp = keyframes`
  0%{
    opacity: 0;
    transform: translateY(20px)
  }

  100%{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Wrapper = styled.div`
  height: 100vh;
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  background-color: var(--background-secondary);
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  img {
    width: 16rem;
  }

  h2 {
    align: left !important;
    padding: 2rem 0 1rem;
    letter-spacing: 0.1px;
    font-weight: 400;
    text-align: left;
    font-size: 1.8rem;
    color: var(--text-primary);
    opacity: 0.1rem;

    animation: 0.5s ${FadeInDown} 0.5s ease-in-out both;
  }

  p {
    font-size: 1.1rem;
    letter-spacing: 0.5px;
    padding: 1rem 0 2rem 0;
    text-align: center;

    animation: 0.5s ${FadeInDown} 1s ease-in-out both;
  }

  button {
    border: 0;
    background: var(--background);
    color: var(--text-secondary);
    font-size: 1.4rem;
    padding: 0.8rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    border-radius: 0.6rem;
    width: 14rem;
    transition: color 0.2s ease-in-out;
    border: 2px solid var(--background-secondary);
    animation: 0.5s ${FadeInUp} 1.25s ease-in-out both;

    span {
      margin-right: 0.5rem;
    }

    svg {
      transition: transform 0.2s ease-in-out;
    }

    &:hover {
      color: var(--accent);
      svg {
        transform: translateX(5px);
      }
    }
  }
`;
