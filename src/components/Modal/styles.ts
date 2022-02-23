import styled, { css, keyframes } from 'styled-components';

import { Container as Button } from '../Button/styles';

interface WrapperProps {
  visible: boolean;
}

export const AnimationModal = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
    visibility: hidden;
  }

  50%{
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
    opacity: 1;
    visibility: visible;
  }
`;

export const ModalContainer = styled.div`
  width: 500px;
  height: auto;
  background-color: var(--card-secondary);
  border-radius: 0.3125em;
  padding: 1.5rem;
  /* .show { */
  transition: all 0.15s ease-in-out;
  /* } */
  /* .hide {
    animation: ${AnimationModal} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse;
  }*/
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    h4 {
      color: var(--text-primary);
      font-size: 1.2rem;
    }
    button {
      border: 0;
      background-color: transparent;
      padding: 0;
      margin: 0;

      svg {
        color: #fff;
        width: 1.6rem;
        height: 1.6rem;
        transition: all 0.15s ease-in-out;
      }

      &:hover {
        svg {
          transform: scale(1.2);
          opacity: 0.8;
        }
      }
    }
  }
`;

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.15s ease-in-out;


  ${props =>
    props.visible
      ? css`
          opacity: 1;
          visibility: visible;
          ${ModalContainer} {
            animation: ${AnimationModal} 0.2s
              cubic-bezier(0.39, 0.575, 0.565, 1) both;
          }
        `
      : css`
          opacity: 0;
          visibility: hidden;
          animation: ${AnimationModal} 0.2s ease-in-out reverse both;
        `};
  }

`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  p {
    padding: 2rem 1rem;
    font-size: 1rem;
    b {
      text-transform: capitalize;
    }
  }
  div.actions {
    display: flex;
    margin: 0 0 0 auto;
    ${Button} {
      transform: scale(0.9);
      justify-content: center;
    }
  }
`;

export const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    margin-top: 0.5rem;
    font-size: 1.5rem;
    color: var(--text-primary);
  }
`;
