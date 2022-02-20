import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  h3 {
    font-family: 'Roboto Slab', serif;
    color: var(--text-primary);
    font-size: 1.8rem;
    font-weight: 300;
    transition: color 0.2s ease-in-out;
  }

  svg {
    color: var(--text-primary);
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
    transition: color 0.2s ease-in-out, margin-left 0.2s ease-in-out;
  }

  &:hover {
    h3,
    svg {
      color: var(--text-secondary);
    }
    svg {
      margin-left: -0.3rem;
    }
  }
`;
