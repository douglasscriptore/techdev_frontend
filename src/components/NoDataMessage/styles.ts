import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  opacity: 0.8;
  span {
    font-size: 1.8rem;
    font-weight: 300;
    color: var(--text-primary);

    a {
      margin: 0 0.4rem;
      text-decoration: none;
      font-size: 1.8rem;
      font-weight: 300;
      color: var(--accent);
      transition: opacity 0.2s ease-in-out;
      &:hover {
        opacity: 0.6;
      }
    }
  }
  svg {
    margin-right: 1rem;
    width: 3rem;
    height: 3rem;

    color: var(--text-primary);
  }
`;
