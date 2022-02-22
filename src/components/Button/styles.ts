import { shade } from 'polished';
import styled from 'styled-components';

const colors = {
  default: '#061831',
  primary: '#1F4287',
  accent: '#21E6C1',
  secondary: '#278Ea5',
};

interface ContainerProps {
  color: 'default' | 'primary' | 'accent' | 'secondary';
}

export const Container = styled.button<ContainerProps>`
  background-color: ${props => colors[props.color]};
  display: flex;
  align-items: center;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;

  color: ${props =>
    props.color === 'accent'
      ? 'var(--background-color)'
      : 'var(--text-primary)'};
  min-width: 180px;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s;

  svg {
    margin-right: 1rem;
    width: 1.2rem;
    height: 1.2rem;
    opacity: 0.6;
  }

  &:hover {
    background: ${props => shade(0.2, colors[props.color])};
  }
`;
