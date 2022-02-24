import styled, { css } from 'styled-components';
import { lighten } from 'polished';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Wrapped = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.9rem;
  label {
    margin-bottom: 0.3rem;
    margin-left: 0.3rem;
  }
`;

export const Container = styled.div<ContainerProps>`
  background: var(--background);
  border-radius: 10px;
  border: 2px solid ${lighten(0.1, '#061831')};
  padding: 16px;
  width: 100%;

  color: var(--text-secondary);

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border: 2px solid #ac3030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: var(--accent);
      border: 2px solid var(--accent);
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--accent);
    `}

  textarea {
    color: var(--text-primary);
    flex: 1;
    font-size: 0.8rem;
    background: transparent;
    border: 0;
    outline: 0;
    &::placeholder {
      color: var(--text-secondary);
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &:before {
      border-color: #c53030 transparent;
    }
  }
`;
