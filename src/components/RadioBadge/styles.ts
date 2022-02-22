import styled from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  checkedItem: number;
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
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;

  div {
    input[type='radio'] {
      display: none;
    }

    label {
      background: var(--background);
      color: var(--text-primary);

      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin: 0 0.3rem !important;
      border-radius: 8px;
      cursor: pointer;
      padding: 0.4rem 1rem !important;
      transition: all 0.3s ease;
      font-weight: 600;
      font-size: 0.8rem;
    }

    input[type='radio']:checked ~ label {
      &:nth-of-type(${({ checkedItem }) => checkedItem}) {
        color: var(--background);
        border-color: var(--accent);
        background: var(--accent);
      }
    }
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
