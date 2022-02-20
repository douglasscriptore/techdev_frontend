import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 0;
    background: var(--background);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
    height: 4rem;
    color: var(--text-secondary);
    font-size: 1.1rem;

    transition: background 0.2s ease-in-out;

    svg {
      width: 1.2rem;
      height: 1.2rem;
      transition: margin-right 0.2s ease-in-out;
    }

    &:hover {
      background: var(--primary);

      svg {
        margin-right: -5px;
      }
    }
  }
`;
